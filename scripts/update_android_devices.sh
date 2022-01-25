wget https://storage.googleapis.com/play_public/supported_devices.csv
iconv options -f utf-16 -t utf-8 supported_devices.csv -o out.csv
deno run -A --no-check parseDevices.ts
