export default interface SnackbarContextProps {
	show: (message: string) => void
	showThenHide: (message: string, delay?: number) => void
	hide: () => void
}