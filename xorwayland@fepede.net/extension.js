const GLib = imports.gi.GLib;
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

    Gtk.IconTheme.get_default().append_search_path(Me.dir.get_child('icons').get_path());

    layout = new St.BoxLayout();
    layout.add_actor(statusButton);
}

function enable() {
	Main.panel._rightBox.insert_child_at_index(layout, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(layout);
}

function _updateIcon() {
    //returns x11 or wayland
    let sessionType = GLib.getenv('XDG_SESSION_TYPE');

    if (sessionType == 'wayland') {
        icon = new St.Icon({ icon_name: 'Wayland_Logo', style_class: 'popup-menu-icon' });
    } else {
        icon = new St.Icon({ icon_name: 'X11_Logo', style_class: 'popup-menu-icon' });
    }

    statusButton.set_child(icon);

    return(true);
}
