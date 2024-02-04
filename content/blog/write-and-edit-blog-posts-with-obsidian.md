---
title: How to edit your website's markdown with Obsidian on mobile and desktop
description: I lay out my current setup for editing my website content on mobile and desktop
date: 2024-02-04
updatedOn: 
tags:
  - obsidian
  - icloud
  - rsync
  - cron
  - crontab
  - shell-commands
  - shell-scripting
draft: true
eleventyExcludeFromCollections: false
---
## Obsidian + iCloud

Lately I've been using [Obsidian](https://obsidian.md/) for journaling and note taking. I like the interface and I like that it is open; everything is saved as a markdown file and you can do whatever you'd like with the files. You can also extend it with plugins however you'd like – more on that later. Given my blog uses markdown files for blog posts, the idea of writing posts in Obsidian seemed like a natural pairing. 

I use iCloud to sync my Obsidian "vaults" between the desktop and iOS app so I can write and edit wherever I want. iCloud will only sync files that are within the designated iCloud folder. So, in order to edit files on my website, I put the entirety of my website folder in the iCloud folder. 

This worked okay. There were two problems though. iCloud on iOS has an annoying habit of dynamically, sometimes aggressively, removing iCloud files off of your iPhone's local storage to store it *in the cloud*. While you can opt out of this behavior on macOS, there currently is no way to stop this behavior on iOS.  When I wanted to edit a blog post on my phone, I would often have to partially or fully redownload my 100+mb website folder onto my phone, `node_modules` and all. Not ideal. 

## Symlinks?

I thought: symlinks are a thing, maybe symlinks would work! I could put a symlink of my blog content folder into the iCloud folder, and trick iCloud into thinking the files were there and sync them that way. Unfortunately, this doesn't work. A symlink is essentially just a file path that points to another file or folder so the file path would get synced, not the files it points to. 

Okay, what if the blog content files were actually in the iCloud folder and I symlink them into the website folder. This almost works and the website will build locally, but now git can't keep track of the content files that are symlinked in. Okay, symlinks are a no-go. 

Which brings us to my current setup, using the command line utilities `rsync` and `crontab` to duplicate the files between my iCloud folder and website folder and keep them in sync. First up, `rsync`. 

## rsync

`rsync` is most often used for syncing files with remote file systems, so it attempts to transfer as little data as possible, only sending files that have changed. It works just as well on your local file system though — efficiency!

The command is relatively simple to use (see this [Digital Ocean article](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories) for more detail). You give it the file path to the folder you want to copy, then give it the file path to the folder you want to copy *to*. 

```bash
rsync "path/to/source/" "path/to/destination"
```

The main gotchas to look out for are including the the trailing slash for the first directory, indicating you want to copy the contents of the folder, not the folder itself. You also want to include the correct flags depending on your needs, which for most cases is to use the `-a` or `--archive` flag. I also include the `-v` or `--verbose` flag, and the `--delete` flag, to delete files in the destination directory that do not exist in the source directory. See the [tldr](https://tldr.sh/) page or [man](https://en.wikipedia.org/wiki/Man_page) page for more information. 

My current script file reads as follows:

```bash
rsync -av --delete "/Users/parkerdavis/Library/Mobile Documents/iCloud~md~obsidian/Documents/Blog/" "/Users/parkerdavis/projects/agave-portfolio/content/blog" >> /Users/parkerdavis/Desktop/output.txt
```

I also include a `>> path/to/txt` at the end of the command to write the output of the command to a text file so I can see that it is working. 

So this works great. The iCloud folder is the source of truth, I edit the files there, on my laptop or phone, then when I run this command on my computer, the files are copied over to the website folder. 

Now we automate this command, so that the files are automatically copied from the iCloud folder to the website folder, using `crontab`.

## crontab

crontab is pretty simple as well. 
```bash
crontab -e
```

Running `crontab` with the `-e` (edit) flag will allow you to edit the crontab file for the current user with good ol' vim. On each line of the crontab file you write the cron schedule followed by the command or script that you want to execute. In my case this is: 

```bash
* * * * * /Users/parkerdavis/scripts/blog-sync.sh
```

The first 5 values are a [cron schedule expression](https://crontab.guru/), followed by the script to execute. With cron notation you indicate what minute, hour, day (of the month), month, and day (of the week) you want the script to run. `*` means any value, so five `*`s means the script will run every minute. 

Then, of course, you have to save and quit vim (<kbd>esc</kbd>, <kbd>:</kbd>, <kbd>wq</kbd> , <kbd>return</kbd>)

Now you can check the active crons with
```bash
crontab -l
```
```output
[Output]
* * * * * /Users/parkerdavis/scripts/blog-sync.sh
```

So I did all this and felt great,  but my script was not executing. 

Turns out on Mac you need to explicitly give the cron utility full disk access permissions as laid out in [this article](https://medium.com/macoclock/automate-running-a-script-using-crontab-on-macos-88a378e0aeac). Once I gave disk permissions to cron, everything worked as expected. As long as my computer is awake, the files are copied over every minute. Done. 

...but do I really want this shell script running every minute that my computer is awake. I'm only editing blog posts maybe 1% of the time that I'm using the computer...

## Obsidian shell commands plugin

With a little digging I found that there is an [Obsidian shell commands](https://publish.obsidian.md/shellcommands/Index) community plugin that allows you to run shell commands from Obsidian. Boom. 

First, I removed the cron jobs from the crontab file:

```bash
crontab -r
```

Then I set the Obsidian plugin to execute the same shell script as before. I can set it on a schedule, like every 60 seconds (*but only when I have Obsidian open*) and I can also hook into Obsidian events and have it run the shell command every time files are modified for near instant synchronization. Using the plugin's GUI doesn't feel quite as 1337 as tinkering with `crontab` in the terminal but only syncing the files when needed is a big win for efficiency. 

Shell scripting rocks. 
