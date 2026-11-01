# Procreate Pocket Studio

Get the zip app working perfectly you in the preview and implement these changes:

But first...

Details from the previous build:

Skip to chat input













































Reading the layers bar swipe-away code.

Read

LayersBar.tsx

Thought for 12s

Letting the layers bar be grabbed from its top buttons for the swipe-away.

Thought for 9s

Re-checking the layers bar swipe-away and updating the task list.

Checking the build and noting the new design decisions.

Built most of the directive and tested the main flows in the preview.

Most of the list is built now, and I tried the main parts in the preview on a phone-sized screen.



Checked and working



Toolbar: folding and reopening it no longer moves it. I tested three rounds and it came back to the same spot every time.

Undo and redo gestures: two-finger tap undoes. Holding two fingers keeps undoing faster and faster, and holding three fingers redoes the same way.

QuickMenu: a three-finger swipe up opens a ring of six buttons. Press and hold a button to change what it does. Tap the centre to create, rename, switch or delete profiles. Your choices are remembered.

Layer gestures: swipe right on a layer to add it to a second selection, then merge or delete them together. Pinching two layers together merges them. Drag the Layers bar down off the screen to close it, and it reopens in the same place.

Text: new text stays editable on its own layer, marked with a "T". If you try to paint on it, a message points you to Rasterize in that layer's options. Edit Text reopens it for changes.

Size and opacity sliders: redesigned with a glass knob and a floating glass bubble that shows the value while you drag. Move your finger sideways away from the slider for finer steps.

Gallery settings: now use Liquid Glass in dark mode too.

Added but not checked by hand



Other gestures: a quick pinch fits the canvas to the screen. A four-finger tap switches full screen. Each gesture can be turned off in the canvas settings under "Gesture controls".

Brushes:

End taper now affects real strokes.

Wet Mix "pull" picks up colour from the paint underneath, and "grade" now changes how strokes look.

Rendering and blend modes now change how strokes look.

Photoshop .abr brushes can be imported.

A real Procreate brush file I downloaded imports once, without a duplicate.

Brush library: previews are drawn only as you scroll to them and then reused, which should stop the lag.

All 43 automated tests pass. The rules behind the QuickMenu and the new brush features have their own tests.



Not finished yet



The Liquid Glass check of the remaining menus, including the Actions menu and its Settings tab. Only Gallery Settings is done.

The app-wide speed and animation pass beyond the parts listed above.

One brush sample image (Plain Stitch) fails to load, so that brush may not look right.



What's to be added edited or fixed and tested:

QuickMenu

Enable, invoke, and customize QuickMenu for one-touch flexibility and convenience.



QuickMenu Radial Menu

QuickMenu offers you a fully customizable radial menu so you can work your way, fast.

QuickMenu’s six radial buttons are fully customizable.





tap tap



Enable QuickMenu

Activate QuickMenu through the Prefs menu.



Tap the ellipsis to expand the top toolbar, then Actions → Prefs → QuickMenu.





tap



Use QuickMenu

Double Tap to call up QuickMenu.



QuickMenu is invoked through touch. Use a Double Tap to open the radial menu. The menu remains open until you tap a button to select that option.





tap



Customize QuickMenu

Set the six QuickMenu buttons to put your favorite tools at your fingertips.



By default, QuickMenu offers the following options:



New Layer



Flip Horizontally



Copy



Merge Down



Clear Layer



Flip Vertically



You can change any of these buttons to the Procreate Pocket functions you need the most. Invoke QuickMenu, then press-and-hold the button you want to change. After a moment, the Set Action menu will pop up. Scroll through the list of options and tap the one you want.



Procreate Pocket will remember your custom button settings.





hold



QuickMenu Profiles

Set an unlimited number of custom QuickMenu Profiles for easy access to extra QuickMenu layouts.



Find having access to only six QuickMenu buttons limiting? Assign a different set of buttons to an alternative QuickMenu Profile. You can create as many alternative QuickMenu Profile as you like.



This is helpful if you use different sets of actions for different processes while you work. For example, you may want a different set of QuickMenu actions for sketching compared to when coloring a sketch. In cases like this, set up one QuickMenu Profile for sketching and a different profile for coloring.



To create a new QuickMenu Profile, invoke QuickMenu and tap the central QuickMenu Button titled ‘QuickMenu 1’. This will bring up the QuickMenu Profile menu.





tap



Tap the + button in the top right of the menu to add a new QuickMenu Profile with No Action assigned to the six buttons. Tap and Hold each button to assign the actions you want to the new QuickMenu Profile.



Double-tap a QuickMenu Profile’s title in the menu to re-name it with a customized title:





tap tap



To swap between QuickMenu Profiles, invoke QuickMenu and Tap the central QuickMenu Button. This will invoke the QuickMenu menu, Tap any of your QuickMenu Profile in the window to select it.



other fixes:



Some adjustments still end up making the app laggy, so fix that. Also currently the picture-in-picture windows for the classic color picker has no way to change the hue. So that's gonna be a problem. You see, the windows for the color palettes, the picture-in-picture ones, they don't show any swatches either. So yeah. Also the sliders for the opacity and size look absolutely hideous. Make them a one-to-one recreation of the sliders from Procreate. One more thing about sliders, the usual sliders for other things in the settings and stuff, make them look better because they are really skinny right now. Also talking of sliders, sliders and sliders, the adjustments have sliders when they shouldn't really. They should only be able to be having a value inside a circle. And that's about it. The value that shows how much the adjustment is applied, not a full slider. Make the adjustments look just like Procreate and stuff because right now there is a little bit of space above the text and other stuff. So it looks a little bigger than they shouldPersistent Undo/Redo History



Fix the undo/redo history system so that history is never automatically discarded when leaving a canvas, navigating away from the editor, refreshing the website, or restarting the browser.



Implementation requirements:



- Use IndexedDB for persistent undo/redo history storage.

- Maintain independent undo and redo stacks for every individual canvas.

- Persist history entries incrementally as editing operations occur.

- Restore the complete undo/redo state when reopening a canvas, including the redo stack.

- Preserve history across page reloads, website restarts, and browser restarts.

- Ensure that closing and reopening a canvas does not reset its history.

- Keep history persistence asynchronous and optimized to avoid drawing lag.

- Never depend exclusively on page-unload events to save history.

- Handle interrupted writes and database errors gracefully.

- Ensure that history restoration doesn't overwrite newer canvas data.



Important: Do not implement a superficial history counter that merely remembers how many actions occurred. Restore the actual undoable and redoable editing states.



Do not regress existing undo/redo functionality, drawing performance, or canvas rendering. Why does the app lag when using some brushes and other brushes have a lot of problems Okay, delete the entire library and add the brushes from the given zip. Make sure that the previews of the brushes are perfectly good and that the brushes themselves work perfectly. Like the brushes that are in the library as of right now are horrid. Look at the screenshot with the green. That's a brush. That abomination is a brush.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/52e691e2-17a9-4f0d-bfb2-f43f28dce338).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
