import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';


const Me = Extension.lookupByUUID('xorwayland@fepede.net');

export default class XorWaylandExtension extends Extension {

    // see https://gjs.guide/extensions/overview/anatomy.html
    constructor(metadata) {
        super(metadata);
        console.debug(`constructing ${this.metadata.name}`);

        this.statusButton = new St.Bin({
            style_class: 'panel-button',
            x_expand: false,
            y_expand: false,
        });
    
        this._updateIcon();
    
        this.layout = new St.BoxLayout();
        this.layout.add_child(this.statusButton);
    }
    
    enable() {
        console.debug(`enabling ${this.metadata.name}`);
        Main.panel._rightBox.insert_child_at_index(this.layout, 0);
    }
    
    disable() {
        console.debug(`disabling ${this.metadata.name}`);
        Main.panel._rightBox.remove_child(this.layout);
    }
    
    _getIcon(icon_name) {
        // Check if icon is available in theme
        // get_default can be null (on Wayland)
        if (Gdk.Display.get_default() && Gtk.IconTheme.get_for_display(Gdk.Display.get_default()) && Gtk.IconTheme.get_for_display(Gdk.Display.get_default()).has_icon(icon_name)) {
            return Gio.icon_new_for_string(icon_name);
        }
        // Icon not available in theme
        return Gio.icon_new_for_string(this.dir.get_child('icons').get_path() + "/" + icon_name + ".svg");
    }
    
    _updateIcon() {
        //returns x11 or wayland
        let sessionType = GLib.getenv('XDG_SESSION_TYPE');
    
        if (sessionType == 'wayland') {
            this.icon = new St.Icon({gicon: this._getIcon('Wayland_Logo'), style_class: 'popup-menu-icon'});
        } else {
            this.icon = new St.Icon({gicon: this._getIcon('X11_Logo'), style_class: 'popup-menu-icon'});
        }
    
        this.statusButton.set_child(this.icon);
    
        return(true);
    }
    
}
