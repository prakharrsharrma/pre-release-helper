export type StringValue = string | null | undefined;

// ----------------------------------------------------------------------

export function snakeCaseToTitleCase(value: StringValue): string {
	if (!value) return '';

	return value
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[_-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase());
}
