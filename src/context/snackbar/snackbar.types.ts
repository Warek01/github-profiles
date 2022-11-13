export default interface SnackbarContextProps {
  snackbarMessage: string
  showSnackbar: (message: string) => void
  showSnackbarThenHide: (message: string, delay?: number) => void
  hideSnackbar: () => void
}
