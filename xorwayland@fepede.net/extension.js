const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Main = imports.ui.main;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const St = imports.gi.St;

let statusButton;
let layout;

function init() {
    statusButton = new St.Bin({
        style_class: 'panel-button',
        x_expand: false,
        y_expand: false,
    });

    _updateIcon();

    layout = new St.BoxLayout();
    layout.add_actor(statusButton);
}

function enable() {
	Main.panel._rightBox.insert_child_at_index(layout, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(layout);
}

function _getIcon(icon_name) {
    // Check if icon is available in theme
    // get_default can be null (on Wayland)
    if (Gtk.IconTheme.get_default() && Gtk.IconTheme.get_default().has_icon(icon_name)) {
        return Gio.icon_new_for_string(icon_name);
    }
    // Icon not available in theme
    return Gio.icon_new_for_string(Me.dir.get_child('icons').get_path() + "/" + icon_name + ".svg");
}

function _updateIcon() {
    //returns x11 or wayland
    let sessionType = GLib.getenv('XDG_SESSION_TYPE');

    if (sessionType == 'wayland') {
        icon = new St.Icon({gicon: _getIcon('Wayland_Logo'), style_class: 'popup-menu-icon'});
    } else {
        icon = new St.Icon({gicon: _getIcon('X11_Logo'), style_class: 'popup-menu-icon'});
    }

    statusButton.set_child(icon);

    return(true);
}
