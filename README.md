# node.js fortuned API client

This is an API client for the `fortuned` fortune cookie API. The API, as
described at https://github.com/ef-gy/fortuned, is quite straightforward and
allows retrieval of fortune cookies, either at random or by providing the ID of
such a cookie.

## Example code

After you've done the usual setup for this node.js module, try this:

    require('fortuned-api-client').cookie().
      then(function(cookie) {
        process.stdout.write(cookie.cookie);
      }, console.warn);

## CLI client

This package comes with a simple CLI wrapper, which you can install like this:

    npm -g install fortuned-api-client

After doing so, you get this shiny new command:

    fortuned-cli.js

This will print a fortune cookie retrieved from the main API server.

## Cookie files

You do not need to install your own cookie files, as they are served directly
from the server side. This makes this version of a JS fortune cookie client
somewhat unique.
