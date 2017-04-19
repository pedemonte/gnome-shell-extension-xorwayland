gnome-shell-extension-xorwayland
====================================

XorWayland is an Gnome-shell extension which displays an icon to tell if Gnome is running using Xorg or Wayland

### Installation from git

    git clone https://github.com/pedemonte/gnome-shell-extension-xorwayland.git
    cd gnome-shell-extension-xorwayland
    mkdir -p ~/.local/share/gnome-shell/extensions
    cp -r xorwayland@fepede.net ~/.local/share/gnome-shell/extensions/.

if you are running Xorg you should restart GNOME Shell (`Alt+F2`, `r`, `Enter`) and enable the extension through gnome-tweak-tool.
if you are runninx Wayland you need to logout and re-login (gnome shell restart isn't supported in Wayland yet) and enable the extension through gnome-tweak tool.

### Screenshots

![ScreenshotWayland](http://www.fepede.net/xorwayland/screenshots/wayland.png)
![ScreenshotXorg](http://www.fepede.net/xorwayland/screenshots/xorg.png)
