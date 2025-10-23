use std::path::PathBuf;
use thiserror::Error;

/// Errors that can occur when working with workspace configuration.
#[derive(Error, Debug)]
pub enum WorkspaceError {
    /// Failed to get user data directory.
    #[error("Failed to get user data directory")]
    DataDirNotFound,

    /// Failed to read workspace file.
    #[error("Failed to read workspace file: {0}")]
    ReadFailed(#[from] std::io::Error),

    /// Failed to write workspace file.
    #[error("Failed to write workspace file: {0}")]
    WriteFailed(std::io::Error),

    /// Workspace file not found.
    #[error("Workspace file not found")]
    WorkspaceFileNotFound,
}

/// Get the user's data directory. Returns the data directory path or WorkspaceError::DataDirNotFound if not found.
///
/// Platform-specific paths ("username" here is the current user's username):
/// - Linux: `$XDG_DATA_HOME` or `$HOME`/.local/share
/// - macOS: `$HOME`/Library/Application Support
/// - Windows: `{FOLDERID_RoamingAppData}`
pub fn get_data_dir() -> Result<PathBuf, WorkspaceError> {
    dirs::data_dir().ok_or(WorkspaceError::DataDirNotFound)
}

/// Get the path to the codecluster data directory. Returns the path to data_dir/codecluster or error if data directory not found.
pub fn get_codecluster_data_dir() -> Result<PathBuf, WorkspaceError> {
    let data_dir = get_data_dir()?;
    Ok(data_dir.join("codecluster"))
}

/// Get the path to the workspace file. Returns the path to data_dir/codecluster/workspace or error if data directory not found.
pub fn get_workspace_file_path() -> Result<PathBuf, WorkspaceError> {
    let codecluster_dir = get_codecluster_data_dir()?;
    Ok(codecluster_dir.join("workspace"))
}

/// Check if the workspace file exists. Returns true if the workspace file exists, false otherwise.
pub fn workspace_file_exists() -> bool {
    match get_workspace_file_path() {
        Ok(path) => path.exists(),
        Err(_) => false,
    }
}

/// Read the workspace path from the workspace file. Returns the workspace path as a String if the file exists and can be read.
/// Returns WorkspaceError::WorkspaceFileNotFound if the file doesn't exist.
/// Returns WorkspaceError::ReadFailed if there's an IO error reading the file.
pub fn read_workspace_path() -> Result<String, WorkspaceError> {
    let workspace_file_path = get_workspace_file_path()?;

    if !workspace_file_path.exists() {
        return Err(WorkspaceError::WorkspaceFileNotFound);
    }

    let content = std::fs::read_to_string(&workspace_file_path)?;
    Ok(content.trim().to_string())
}

/// Get the default workspace path. Returns the codecluster data directory as the default workspace path.
pub fn get_default_workspace_path() -> Result<String, WorkspaceError> {
    let codecluster_dir = get_codecluster_data_dir()?;
    Ok(codecluster_dir.to_string_lossy().to_string())
}

/// Write the workspace path to the workspace file. Creates the codecluster data directory if it doesn't exist.
/// Returns Ok(()) on success, or WorkspaceError::WriteFailed on failure.
pub fn write_workspace_path(workspace_path: &str) -> Result<(), WorkspaceError> {
    let codecluster_dir = get_codecluster_data_dir()?;
    let workspace_file_path = get_workspace_file_path()?;

    // Create codecluster directory if it doesn't exist
    std::fs::create_dir_all(&codecluster_dir).map_err(WorkspaceError::WriteFailed)?;

    // Write the workspace path to the file
    std::fs::write(&workspace_file_path, workspace_path).map_err(WorkspaceError::WriteFailed)?;
    Ok(())
}

/// Get the current workspace path. If the workspace file exists, reads the path from it.
/// If the workspace file doesn't exist, returns the default workspace path (codecluster data directory).
/// Automatically creates the workspace file with the default path if it doesn't exist.
pub fn get_current_workspace_path() -> Result<String, WorkspaceError> {
    match read_workspace_path() {
        Ok(path) => Ok(path),
        Err(WorkspaceError::WorkspaceFileNotFound) => {
            // If workspace file doesn't exist, use default path and create the file
            let default_path = get_default_workspace_path()?;
            write_workspace_path(&default_path)?;
            Ok(default_path)
        }
        Err(e) => Err(e),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::tempdir;

    /// Test that data directory can be retrieved successfully. Verifies that the data directory exists on all platforms.
    #[test]
    fn test_data_dir() {
        let data_dir = get_data_dir();
        assert!(data_dir.is_ok());
        let data_path = data_dir.unwrap();
        assert!(data_path.exists());
    }

    /// Test workspace file existence check. Ensures the function doesn't panic when checking for non-existent file.
    #[test]
    fn test_workspace_file_exists() {
        let _ = workspace_file_exists();
    }

    /// Test reading workspace path when file doesn't exist. Verifies that WorkspaceFileNotFound error is returned for missing file.
    #[test]
    fn test_read_workspace_path() {
        let result = read_workspace_path();
        assert!(matches!(result, Err(WorkspaceError::WorkspaceFileNotFound)));
    }

    /// Test basic workspace file operations. Creates temporary workspace file and verifies read operations work correctly.
    #[test]
    fn test_workspace_operations() {
        let temp_dir = tempdir().unwrap();
        let test_data_dir = temp_dir.path();
        let test_codecluster_dir = test_data_dir.join("codecluster");
        fs::create_dir_all(&test_codecluster_dir).unwrap();

        let workspace_file = test_codecluster_dir.join("workspace");
        let test_path = "/test/workspace/path";
        fs::write(&workspace_file, test_path).unwrap();

        assert!(workspace_file.exists());

        let result = std::panic::catch_unwind(|| {
            let content = fs::read_to_string(&workspace_file).unwrap();
            assert_eq!(content.trim(), test_path);
        });
        assert!(result.is_ok());
    }

    /// Test default workspace path retrieval. Verifies that default path points to codecluster data directory.
    #[test]
    fn test_default_workspace_path() {
        let result = get_default_workspace_path();
        assert!(result.is_ok());
        let default_path = result.unwrap();
        assert!(default_path.contains("codecluster"));
    }

    /// Test workspace path write and read operations. Creates temporary file and verifies write/read cycle works correctly.
    #[test]
    fn test_write_read_workspace_path() {
        let temp_dir = tempdir().unwrap();
        let test_data_dir = temp_dir.path();
        let test_workspace_path = "/custom/workspace/path";

        let write_result = std::panic::catch_unwind(|| {
            let test_codecluster_dir = test_data_dir.join("codecluster");
            let workspace_file = test_codecluster_dir.join("workspace");

            fs::create_dir_all(&test_codecluster_dir).unwrap();
            fs::write(&workspace_file, test_workspace_path).unwrap();

            assert!(workspace_file.exists());
        });
        assert!(write_result.is_ok());

        let read_result = std::panic::catch_unwind(|| {
            let test_codecluster_dir = test_data_dir.join("codecluster");
            let workspace_file = test_codecluster_dir.join("workspace");

            let content = fs::read_to_string(&workspace_file).unwrap();
            assert_eq!(content.trim(), test_workspace_path);
        });
        assert!(read_result.is_ok());
    }

    /// Test current workspace path with existing file. Verifies that existing workspace file is read correctly.
    #[test]
    fn test_current_workspace_path() {
        let temp_dir = tempdir().unwrap();
        let test_data_dir = temp_dir.path();
        let test_codecluster_dir = test_data_dir.join("codecluster");
        fs::create_dir_all(&test_codecluster_dir).unwrap();

        let workspace_file = test_codecluster_dir.join("workspace");
        let test_path = "/test/workspace/path";
        fs::write(&workspace_file, test_path).unwrap();

        let result = std::panic::catch_unwind(|| {
            let content = fs::read_to_string(&workspace_file).unwrap();
            assert_eq!(content.trim(), test_path);
        });
        assert!(result.is_ok());
    }
}
