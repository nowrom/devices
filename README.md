# Android rom repo

## Non automatable roms (4)

These roms don't have a public devices.json list or whatever and have to be added manually, or if you find a way to get the json or get the devices another way..

- xioami.eu
- nusantararom
- derpfest
- Octavi-OS

## Manually maintained roms (2)

- calyxos
- GrapheneOS

## Unmaintained roms (2)

- blissrom: https://github.com/BlissRoms-Devices/OTA/blob/master/builds.json
- curvus os: https://github.com/CorvusRom-Devices/OTA

## Completed roms (25)

- PixelExperience
- ArrowOs
- DroidOnTime
- Syberia
- LegionOs
- AncientOs
- HavocOs
- CRdroid
- PixelPlusUI
- AospExtended
- Sakura
- Spark os
- CalyxOS
- PixelExtended
- SuperiorOs
- CherishOs
- EvolutionX
- Potato
- Lineageos
- GrapheneOS
- blissroms
- paranoidandroid
- PixysOS
- revengeos
- Xiaomi.eu

## Contributing

getting started:

you will need deno installed and you will have to clone the syberia devices repo

```sh
git clone https://github.com/syberia-project/official_devices ota/official_devices
git clone https://github.com/Havoc-OS/OTA ota/havocota
git clone https://github.com/crdroidandroid/android_vendor_crDroidOTA ota/android_vendor_crDroidOTA
git clone https://github.com/Spark-Devices/OTA ota/sparkota
git clone https://github.com/PixelExtended/OTA ota/pixelextendedota
git clone https://github.com/LineageOS/lineage_wiki ota/lineage_wiki
git clone https://github.com/PixelExperience/official_devices ota/pixelexperience
git clone https://github.com/AOSPK/official_devices ota/oaspk
git clone https://github.com/RevengeOS-Devices/official_devices ota/revenge
git clone https://github.com/ingbrzy/Xiaomi.eu-MIUIv12-XML-Compare ota/xiaomieu
```

make changes to updatelist.ts and commit done 🚀

### Updating android_devices.json

```sh
wget https://storage.googleapis.com/play_public/supported_devices.csv
iconv options -f utf-16 -t utf-8 supported_devices.csv -o out.csv
deno run -A --no-check parseDevices.ts
```

## License inforation

This project is licensed under the GPL-3.0 license, and used code files from other repositories if i used your code without you wanting it please contact me at tricked@tricked.pro to solve the issue
