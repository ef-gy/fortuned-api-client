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

