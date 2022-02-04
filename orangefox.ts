export async function orangefox() {
	const devices = (
		await fetch('https://api.orangefox.download/v3/devices/').then((r) =>
			r.json()
		)
	).data;
	return devices.map((x: Record<string, string>) => {
		return {
			codename: x.codename,
			brand: x.oem_name,
			name: x.model_name,
			recovery: {
				id: 'orangefox',
				supported: x.supported,
			},
		};
	});
}
