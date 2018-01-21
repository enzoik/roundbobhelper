<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
?>
{
    "productCategories": [
        {
            "id": 1,
            "name": "Honey Moon",
            "product_type_id": 1,
            "image": "https:\/\/www.roundbob.com\/img\/imagecache\/destinations\/58b67bf3-0a4c-492b-a5b3-134889ac00e9_338597001488354291-20170301104451-1488354291.jpg"
        },
        {
            "id": 2,
            "name": "Christmas",
            "product_type_id": 1,
            "image": null
        },
        {
            "id": 3,
            "name": "Boat Riding",
            "product_type_id": 2,
            "image": null
        }
    ],
    "responseStatus": {
        "status": true,
        "message": "",
        "code": 200
    }
}