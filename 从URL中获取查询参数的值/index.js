function getQueryVariable(variable) {
    /* substring除去? */
    let query = window.location.search.substring(1);
    /* 分离 */
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        /* 分离 */
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}