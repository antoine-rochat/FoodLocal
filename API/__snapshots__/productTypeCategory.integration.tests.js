exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing addProductTypeCategory(productTypeCategory) should add a new productTypeCategory 1'] = {
  "data": {
    "addProductTypeCategory": {
      "name": "bl\u00E9",
      "image": "ceci est une image de bl\u00E9 encod\u00E9e en base64! :D"
    }
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing addProductTypeCategory(productTypeCategory) should fail adding a new productTypeCategory because given field "rienAVoir" is not defined in schema 1'] = {
  "errors": [
    {
      "message": "Variable \"$productTypeCategory\" got invalid value { name: \"bl\u00E9\", image: \"ceci est une image de bl\u00E9 encod\u00E9e en base64! :D\", rienAVoir: \"ceci est un champ qui n'a rien \u00E0 faire ici!\" }; Field \"rienAVoir\" is not defined by type ProductTypeCategoryInputAdd.",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ]
    }
  ]
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing addProductTypeCategory(productTypeCategory) should fail adding a new productTypeCategory because missing name 1'] = {
  "errors": [
    {
      "message": "Variable \"$productTypeCategory\" got invalid value { image: \"ceci est une image de bl\u00E9 encod\u00E9e en base64! :D\" }; Field value.name of required type String! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ]
    }
  ]
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing addProductTypeCategory(productTypeCategory) should fail adding a new productTypeCategory because not authenticated 1'] = {
  "errors": [
    {
      "message": "Sorry, you need to be authenticated to do that.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "addProductTypeCategory"
      ],
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ],
  "data": null
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing addProductTypeCategory(productTypeCategory) should fail adding a new productTypeCategory because not authenticated as administrator 1'] = {
  "errors": [
    {
      "message": "Sorry, you need to be an administrator to do that.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "addProductTypeCategory"
      ],
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ],
  "data": null
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing deleteProductTypeCategory(productTypeCategoryId) should delete a productTypeCategory 1'] = {
  "data": {
    "deleteProductTypeCategory": {
      "name": "Autres",
      "image": "data:image/png;base64,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"
    }
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing deleteProductTypeCategory(productTypeCategoryId) should fail deleting a productTypeCategory because not authenticated 1'] = {
  "errors": [
    {
      "message": "Sorry, you need to be authenticated to do that.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteProductTypeCategory"
      ],
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ],
  "data": {
    "deleteProductTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing deleteProductTypeCategory(productTypeCategoryId) should fail deleting a productTypeCategory because not authenticated as administrator 1'] = {
  "errors": [
    {
      "message": "Sorry, you need to be an administrator to do that.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteProductTypeCategory"
      ],
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ],
  "data": {
    "deleteProductTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing deleteProductTypeCategory(productTypeCategoryId) should fail deleting a productTypeCategory by id because invalid id received (too long) 1'] = {
  "errors": [
    {
      "message": "Cast to ObjectId failed for value \"abcdefabcdefabcdefabcdefabcdef\" at path \"_id\" for model \"productTypeCategory\"",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteProductTypeCategory"
      ]
    }
  ],
  "data": {
    "deleteProductTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing deleteProductTypeCategory(productTypeCategoryId) should fail deleting a productTypeCategory by id because invalid id received (too short) 1'] = {
  "errors": [
    {
      "message": "Cast to ObjectId failed for value \"abcdef\" at path \"_id\" for model \"productTypeCategory\"",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteProductTypeCategory"
      ]
    }
  ],
  "data": {
    "deleteProductTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing deleteProductTypeCategory(productTypeCategoryId) should fail deleting a productTypeCategory by id because unknown id received 1'] = {
  "data": {
    "deleteProductTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing updateProductTypeCategory(productTypeCategory) should fail updating a productTypeCategory because missing id 1'] = {
  "errors": [
    {
      "message": "Variable \"$productTypeCategory\" got invalid value { image: \"ceci est une image de bl\u00E9 encod\u00E9e en base64! :D\" }; Field value.id of required type ID! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ]
    },
    {
      "message": "Variable \"$productTypeCategory\" got invalid value { image: \"ceci est une image de bl\u00E9 encod\u00E9e en base64! :D\" }; Field value.name of required type String! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ]
    }
  ]
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing updateProductTypeCategory(productTypeCategory) should fail updating a productTypeCategory because missing name 1'] = {
  "errors": [
    {
      "message": "Variable \"$productTypeCategory\" got invalid value { image: \"ceci est une image de bl\u00E9 encod\u00E9e en base64! :D\" }; Field value.id of required type ID! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ]
    },
    {
      "message": "Variable \"$productTypeCategory\" got invalid value { image: \"ceci est une image de bl\u00E9 encod\u00E9e en base64! :D\" }; Field value.name of required type String! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ]
    }
  ]
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing updateProductTypeCategory(productTypeCategory) should fail updating a productTypeCategory because not authenticated 1'] = {
  "errors": [
    {
      "message": "Sorry, you need to be authenticated to do that.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "updateProductTypeCategory"
      ],
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ],
  "data": {
    "updateProductTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing updateProductTypeCategory(productTypeCategory) should fail updating a productTypeCategory because not authenticated as administrator 1'] = {
  "errors": [
    {
      "message": "Sorry, you need to be an administrator to do that.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "updateProductTypeCategory"
      ],
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ],
  "data": {
    "updateProductTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory MUTATION productTypeCategory Testing updateProductTypeCategory(productTypeCategory) should update a productTypeCategory 1'] = {
  "data": {
    "updateProductTypeCategory": {
      "name": "bl\u00E9",
      "image": "ceci est une image de bl\u00E9 encod\u00E9e en base64! :D"
    }
  }
}

exports['Testing graphql request productTypeCategory QUERY productTypeCategory Testing productTypeCategories() should get all productTypeCategory 1'] = {
  "data": {
    "productTypeCategories": {
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
        "endCursor": "YXJyYXljb25uZWN0aW9uOjU="
      },
      "edges": [
        {
          "node": {
            "name": "Autres",
            "image": "data:image/png;base64,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"
          }
        },
        {
          "node": {
            "name": "Boissons",
            "image": "data:image/png;base64,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"
          }
        },
        {
          "node": {
            "name": "C\u00E9r\u00E9ales",
            "image": "data:image/png;base64,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"
          }
        },
        {
          "node": {
            "name": "Fruits",
            "image": "data:image/png;base64,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"
          }
        },
        {
          "node": {
            "name": "L\u00E9gumes",
            "image": "data:image/png;base64,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"
          }
        },
        {
          "node": {
            "name": "Viandes",
            "image": "data:image/png;base64,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"
          }
        }
      ]
    }
  }
}

exports['Testing graphql request productTypeCategory QUERY productTypeCategory Testing productTypeCategory(productTypeCategoryId) should fail getting a productTypeCategory by id because invalid id received (too long) 1'] = {
  "errors": [
    {
      "message": "Cast to ObjectId failed for value \"abcdefabcdefabcdefabcdefabcdef\" at path \"_id\" for model \"productTypeCategory\"",
      "locations": [
        {
          "line": 1,
          "column": 17
        }
      ],
      "path": [
        "productTypeCategory"
      ]
    }
  ],
  "data": {
    "productTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory QUERY productTypeCategory Testing productTypeCategory(productTypeCategoryId) should fail getting a productTypeCategory by id because invalid id received (too short) 1'] = {
  "errors": [
    {
      "message": "Cast to ObjectId failed for value \"abcdef\" at path \"_id\" for model \"productTypeCategory\"",
      "locations": [
        {
          "line": 1,
          "column": 17
        }
      ],
      "path": [
        "productTypeCategory"
      ]
    }
  ],
  "data": {
    "productTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory QUERY productTypeCategory Testing productTypeCategory(productTypeCategoryId) should fail getting a productTypeCategory by id because unknown id received 1'] = {
  "data": {
    "productTypeCategory": null
  }
}

exports['Testing graphql request productTypeCategory QUERY productTypeCategory Testing productTypeCategory(productTypeCategoryId) should get a productTypeCategory by id 1'] = {
  "data": {
    "productTypeCategory": {
      "name": "Autres",
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAMC0lEQVR4Xu3cA5AE2xUG4Bfbrti2VbFtO6k4qahi27Zt23gxKqmKbdvG//XMqdfp9MzOLDI9O/1X/bVz233Pvece9R4wYsSIESNGjBgxYsSIESNGjBgxYsSIESN2hmOFpw6P2bT2ObzkJcKDN63h4KjhA8Nvh/9u8Zvh/cMjh/sGZwzvGX4k/EfoRa8Z7hWOEp508nMhnCf8QVgCeHr4gOlfbdu/F54jXEscJrx0+JSwPeL+GL5n+vuF4V7gnOHvQvd4nA3BwaZ/+2CwOP4P4U3C7szVvmlo/2/C04ZrgeOGNwtfH/4+LCEYWUba5cLDhfCt8CfhXqitp4bu+43wX6F7/S18TNiF+382/Ht4YRvmwH7HfTKcJ+BB4CXhP0Md4e/Hw/uEZwn7Hv7JoWPP3rR2F28IXftUocHxtbBm6fHDNgwS25/QtLbGE0PHX7JpDRgHhh701uGxbejBEcOrhM8Nfxo6/k7hbsNgMEMLnufn4a/CI9jQwvNDz3H6prU1Thc63iwcNO4RetDLNq2DYGG9XfiO8C+hY4rWkxOEu4lDhFTkj8Ja1F8Tup/1oY1Dhb8Mv9y0FoPZ/qfwvU1rwLAweulnhhcIHxF+YboN6fJPhcxHauq1oe1HC3cDOsrsJIi6J35x+teA6OLioX0PbVqLw+L+wcnPYeM7YbszqA063EJ/vLAN64tjLta0do7Hh6734/DR4V3CV4ZlYlOVXTwttG+ZdezkoXNe1LQGDmqLGvLAhMD0nQWCcBxbf6e4UOharJ/ujHMfqvKrIXVWYF2ZTRb7ZSymO4fudYOmtQa4auiBH9S0JqZwn93O/KWLP9a0doZnhe55tqb1v+CL2N82a/kqtllvdPJJwkXwoZAJvVuqds9xyNDI86JG4etCquvwYRdvDpnIO1nYjfqfhWbALDA0dD7josD8ta1ojft0eK/wNGEfWGtU4Lub1hrhsaGXvGB47+nvK4RdmPb23b1pbQ8XDV2D1XPWsK2WCtcIHXPzpjWBmWvbq8PrTf+2ndkPhMcJ26CG7btt01ojnD/04I8KLZh+Pynsgk8gFCFW1NeRi6C88uJvQ7Py0GHheaF9fIjCw0PbdHLhsKGB84rQPjO4DW0zabdN9T0HtaWjPxPqaJ3E5O1D6XejeFnUwsy643ET+lembU4o8DV+EX6uaU1wi9A9rQWXCT1vF9Y26sn54Hp/Dj/RtNYQbw/FfcwC05+l0/fiJwzt+3y47Czh7+jYCiD24VKhY5jZhY+GthUJ7AXhlUNrnfTA90MBx4q1ldoTsV5LcLa8wLlDEV+/Txn2oeJDt2xai0P8yXlU5Cw8J3RMWXr8IYYEtebZHhl+PXQMmgXod9thfGnYvs7aoRZsf+86/c0z7sMxQqNUGKPrQM6CkWsU/3D6uw+lrnjrBUKv52rjzKHkFJXE2uJY1nWtR78OqcO1RTlrzEhWjN/XCWfhhqFjqLfS2/NQ15+nrkRkHVM+EVCly/oRdR2GwNpC9NRLMIHNAC8zKwpcoMed8/Jw1qgvlOV03qbVj2eHjjH6QRbxr+GyfkSFWKi4tQXP10s8o2ktBqGWd4bOe7ANM6BjBfgcx9t3Dm+77TcwIITc5UIKZqhzbtO0FoOBQS1K7w4+KTUPJwu9vEzhMjhSKErM3qfG+nDH0LXfFrLO/MZ2jkL62La2mhFsdN1ukqoLAmeVcWpvH3avvZY4V+hFHhZaqJfJsBGm9C5zuFtUwDSWmrXIlq/BdDb62x0tg+n+MpZgXWLGSowpaJinEkVyndum53ljKBh6pfBE4Vrh+qEXEa6oF1TrtCiEXThmXwrbXve1Q9dirs6Cch6qzOwpECQrrjqYGrI2CL10QT2JjTGn7xAqxjBrK5RfpBLfFXoWz6WOa6u1b2Uo30PoxMtJny6rgxUluAYVBV5WJ/MT5pnHpdK66WEhGj4Hj17wszpWqKQ60qCx7S1h19rj5G4lJPGwA0P3kKFcphRpT8H2p1aOHtLbRtKyoMsJ0ojVOWU+vyqcBR1rITdDWHcFKtRzyOeDwUEdik+5prQB8NTd07YKlZhJYl7UX5+QRAwMAprAe7eFxKqjIlcKoQcvT+fWWjLPX5gHqWDnXz1UzlMvqpDBwt2FzKD9PPSC6hMhettVTLbB87a97ZWLGhOChFfdr7iIkKxthMTCdA7jYKWQCPIg9wuvOP19t3A7OEPo/NL/qkReHHLubOtCENNgaCerKoyDzuOHMH35SqVabxQWmN+iCuXV82euFrLYnFszqDhLSJxi+w2mlaLCJszWCsrRu9tF1VSxdKq+9sThmaZ/FTfQ6TrFcUUdR5+LCFvEPcP7QkHP9nGCjWU4EOR3w/Z+HW5GMn2tCxxNSSwLuXVOdKEqJdvniHgbHJ5xpdBBHor6kF/weydR0iqq4xMULhIarV64OkGYvxZu605bl+swziaBWlvMCJ3JCqzcP6EI3TvWmsBSFGnQ4a5d10K1AwRp8TbwqnbZvreGymWtJxzWlaPyDYqpK0G1rIPYRoXQxaSsT7J72oTBS9e5fX6BjhZa4QuZIc7xV+6kD5V9VKzRBWOBWXvdcJaQanBQq4PyU+QVPJgRbYEzUndSzKBjmZN8klInVE/FqPgdbV+l0M74uYZRrxN1XHu2FWqEzwvntzFPSNTlotWQe44KLNaskDlk/m03TQtVWEe4wvltn8aMrMAfL5rnPguiAMxiQunOFDkS60tfQcaiICSaQc6F6hoEKm1beQj2/k6/BeHHEEjbGuqCeesYVlgXnullk5+NUDwf51AevWDdUQm/G2Bg8MMGg6qn3Q1PtYrqZO3A7Lh82M1p2H6rcJaqaI/8Uk+VqKqyIDVeuwGWIb9pMDCSvWC7Fmq7YNK6VnV0JacqnsXZ6+brdXBZT30Qqqe2yusvh1IZqgjBTsCKcy2DcjAQE6LvZeh2CrEw5miBmmEJnaJpTb5u6nY+p64v/81rrrWMicxQgCoLQvpfutaMFA8T6KzI8iKoDOMgCiKsFWxzpEM5SNVGBQ0cumXgOu+f/NwW2uENJaQFnS6UDwrtPCsTmSktklsCQoNLMFFWk4XGnK6vwRTOtd/RszpHvkZb2GhltVxGc/tF+kgoy4Cn3a7rol44Yl2cL2SGdqHDBDnbIJhSWSwji7wPUtvgYbvXQ0KdK1LQfg8WmXqv8j/mcTdU97bAS6ZeqJMu63sMo2YZMHmpEYFK8ElAX5GCoOBWRgSTmBoSBzPqmcsVYFwkAGqki8+pUOHnGCzO9b1I3ztX+Wmf3/N/AYFgHzzgdgTC2+fHGMVUCs/dDGHmWuh1Kr19rdDaoVbYqHYfKkbUWSyqPqNDo5oDC2WA0PnzDIFZcK4Z1AeVkfbvK4EAJ65G43ZoRhCKyC0vmvoptOuDCZ4jy/wlXD7UVkJy3sYJBCotLKiokNtaJGRBfQjisbbofIFHs0pxtZhS90NPwUOdXrA+icy63ofDqmgpbiUkx2ykQHSu8+dlDLeCqhbXoMZAx+rwdq0Ws5gqFMVdREjaGykQ4AFTXduFPIZnqLIe64+2tWkethLSxgqkKlhcazuoELtsHugo7Vrgl0EJyfkbKxAJJde4cdNaHrUOVRGeQKT2VsVz8+D8QQtEEsiDdFk2Of3dt38RyoW7xpta25Zh1fsKoWgLAFrku8ctQ9djGPTtu2+4coF4gJH/zZUKRMmNBxg5SdKtXCCz1pBNBLU1CIFIFqnq8B1HRUU3AWJp/p1IfYI9GIHU5wg461O2/Yj6Hy7iZjCoGSK8wapp5633O3yoJFMojAODEciICQYhEBk+zt/Iic+1coF4gJH/zZUKZFbGcBM5qIyh8s5NMnkLCrrl6WEwi7qyGTPFerLoPwfbD1DAp/jBJ3EwGIH4f1Q+jvEw7dKb/Q4d753rH6oNyuyV6pRO3SSooPS9YmmF0Q8ZGAYhEKqqBLPprA+FRoEMhIMQCI6YYFBrCOuq719X7GdY1H1CPbhFvW32Vk3uJsCn1965/i3UYARSjqGyzU1yDJW8cgzrg9NBqaxNDZ2ojqyPUgchkDG4eBBXHlxc5IOdTeTKPthpf9I2ckIfAu2kMnLEiBEjRowYMWLEiBEjRowYMWLEiBEjlsEBB/wHRFeqwdJijSsAAAAASUVORK5CYII="
    }
  }
}
