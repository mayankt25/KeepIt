import React from "react";

function Footer(){
    const date = new Date();;
    const year = date.getFullYear();
    return <footer><p>Copyright © {year} Mayank Tripathi</p></footer>;
}

export default Footer;