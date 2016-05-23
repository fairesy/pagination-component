define(['jquery'], function ($) {
  function get(url) {
    return $.ajax({
      method: 'GET',
      url: url,
    });
  };

  return {
    get: get,
  };
});
