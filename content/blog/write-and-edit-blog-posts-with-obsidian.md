---
title: Edit your website's markdown on the go with Obsidian
description: I lay out my current setup for editing my website content on mobile and desktop
date: 2024-02-05
updatedOn: 
tags:
  - obsidian
  - icloud
  - rsync
  - cron
  - crontab
  - shell-commands
  - shell-scripting
draft: false
eleventyExcludeFromCollections: false
---
## Obsidian + iCloud

I like using [Obsidian](https://obsidian.md/) for journaling and note taking. I like the interface and I like that it is open; everything is saved as a markdown file and you can do whatever you'd like with the files. You can also extend it with plugins however you'd like (more on that later). Given my blog uses markdown files for blog posts, the idea of writing posts in Obsidian seemed like a natural pairing. 

## Store entire website on iCloud?

I use iCloud to sync my Obsidian "vaults" between the desktop and iOS app. iCloud will only sync files that are within the designated iCloud folder, so, my original idea was to put the entirety of my website folder in the iCloud folder, node_modules and all.

This was okay but there were two problems. iCloud on iOS has a habit of dynamically offloading files from your phone's local storage to the cloud. While you can opt out of this behavior on macOS, there currently is no way to stop this on iOS.  When I wanted to edit a blog post on my phone, I would often have to partially or fully redownload my >100MB website folder onto my phone to edit my 8kB markdown file. Not ideal. 

## Symlinks?

I thought: symlinks are a thing, maybe symlinks would work! I could put a symlink of my blog content folder into the iCloud folder to trick iCloud into thinking the files were there and sync them that way. Unfortunately, this doesn't work. A symlink is essentially just a file path that points to another file or folder so the file path would get synced but not the files it points to. 

Okay, what if just the blog content files are placed in the iCloud folder and I symlink them back into the website folder? This almost works and the website will build locally, but now git can't keep track of the content files that are symlinked in. Okay, symlinks are a no-go. 

Which brings us to something workable, using rsync to duplicate the files between iCloud and the website folder.
## rsync

rsync is most often used for syncing files with remote file systems, so it attempts to transfer as little data as possible, only sending files that have changed. It also works just as well copying files on your local file system. 

The command is relatively simple to use. You give it the file path to the folder you want to copy, then give it the file path to the folder you want to copy *to*. 

```bash
rsync "path/to/source/" "path/to/destination"
```

If you're duplicating a folder, make sure to include the trailing slash for the first file path, indicating you want to copy the contents of the folder, but not the folder itself. 

You also want to include the correct flags depending on your needs. For most cases, the `-a` or `--archive` flag gives you a solid set of defaults. I also include the `-v` or `--verbose` flag, and the `--delete` flag, to delete files in the destination directory that do not exist in the source directory. See [tldr](https://tldr.inbrowser.app/pages/common/rsync) , [man](https://man7.org/linux/man-pages/man1/rsync.1.html), or [this Digital Ocean article](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories) for more information. 

My current script file reads as follows:

```bash
# blog-sync.sh

rsync -av --delete "/Users/parkerdavis/Library/Mobile Documents/iCloud~md~obsidian/Documents/Blog/" "/Users/parkerdavis/projects/agave-portfolio/content/blog" >> /Users/parkerdavis/Desktop/output.txt
```

I include a `>> path/to/txt` at the end of the command to write the output of the command to a text file so I can see that it is working. 

If you're unable to execute the shell script file you can change access permissions for the file using chmod.

```bash
chmod +x "path/to/file"
```

The `+x` flag modifies the permissions to make the file executable.

So this works. The iCloud folder is the source of truth which is automatically synced between my laptop and phone, I edit the files there, then when I run this command, the up-to-date files are copied over to the website folder. 

Now we can automate this command, so that the files are automatically copied on a schedule using `crontab`.

## crontab

```bash
crontab -e
```

Running `crontab` with the `-e` (edit) flag will allow me to edit my crontab file with good ol' vim.

I press <kbd>i</kbd> to enter "insert" mode in vim then enter this on the first line:

```bash
* * * * * /Users/parkerdavis/scripts/blog-sync.sh
```

The first 5 values are a [cron schedule expression](https://crontab.guru/), followed by the script to execute. With cron notation you indicate what minute, hour, day (of the month), month, and day (of the week) you want the script to run. `*` indicates any value, so five `*`s means the script will run every minute of every hour of every day of every month and also every day of the week. 

Then, of course, you have to save and quit vim (<kbd>esc</kbd>, <kbd>:</kbd>, <kbd>wq</kbd> , <kbd>return</kbd>)

Now you can check the active crons with
```bash
crontab -l
```
```output
# Output

* * * * * /Users/parkerdavis/scripts/blog-sync.sh
```

Okay great, a successfully activated cron...but my script was not executing automatically. 

Turns out on Mac you need to explicitly give cron full disk access permissions as laid out in [this article](https://medium.com/macoclock/automate-running-a-script-using-crontab-on-macos-88a378e0aeac). Once I gave permission, everything worked as expected. As long as my computer is awake, the files are copied over every minute. Good to go. 

...but do I really want this shell script running every minute that my computer is awake. I'm only editing blog posts maybe 1% of the time that I'm using the computer. This feels a little excessive...

## Obsidian shell commands plugin

With a little digging I found that there is an [Obsidian shell commands](https://publish.obsidian.md/shellcommands/Index) community plugin that allows you to run shell commands from Obsidian. Hey now. 

First, I removed the cron jobs from the crontab file:

```bash
crontab -r
```

Then I set the Obsidian plugin to execute the shell script instead. I can set it on a schedule like before (but only while Obsidian is open) but I can also hook into Obsidian events and have it run the script every time a file is modified. Of course using the plugin's GUI doesn't feel quite as 1337 as tinkering with `crontab` in the terminal but only syncing the files when there are changes to sync is pretty sweet.

So far this method is perfect for my needs. I can write and edit posts that automatically sync between my laptop and phone, then when I'm ready to publish, I hop on the computer, the files are copied over to my website folder, I do a git push, and away it goes!

Shell scripting rocks. 
