
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
?>
{
    "productContent": {
        "id": 6,
        "content": [
            "Description",
            "- Enjoy the best package in Dubai",
            "- It\u0027s the best you will ever get in dubai this festive season",
            "",
            "Includes",
            "- Airport Pickup",
            "- Free WiFi",
            "- Free Transportation",
            "- Free Drinks",
            "",
            "Excludes",
            "- Flight",
            "- Cruises",
            "",
            "Note",
            "- Note 1",
            "- Note 2",
            "- Note 3"
        ]
    },
    "productMeta": {
        "child_price_option": [
            {
                "title": "title",
                "price": "100"
            }
        ],
        "adult_price_option": [
            {
                "title": "Single Sharing",
                "price": "1000"
            },
            {
                "title": "Double Sharing",
                "price": "1500"
            }
        ]
    },
    "responseStatus": {
        "status": true,
        "message": "",
        "code": 200
    }
}