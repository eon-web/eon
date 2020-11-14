---
title: 'Debugging'
number: 4
group: 'Advanced'
---

# Debugging
Debugging, especially of server-side code, can be very frustrating. With this guide, I hope to make your life a bit easier.

## Enabling EON's logger
The logical first step should be to check the log's that EON puts out. For convenience, these will be hidden by default. To enble them, simply run the following two commands
```bash
# Tells the debugger that all messages coming from 'eonjs' should be shown.
export DEBUG=eonjs
# Sets the loglevel to show ALL logs.
export EON_LOGLEVEL=silly
```

### Available loglevels
Sometimes, not every log is important to you. You can set the loglevel to specify what information you need. Here's a list of all log levels
```
- Error     : Show only Error logs
- Info      : Show Error logs and info logs
- Warning   : Show Error, info and warning
- Verbose   : Show Error, info, warning and verbose
- Silly     : Show all
```

That's all I've got for you right now. You can add your own debugging tips to this page on [GitHub](https://github.com/eon-web/eon/blob/master/docs/docs/src/posts/debugging.md)
