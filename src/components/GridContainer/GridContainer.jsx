import "./GridContainer.css"

/**
 * En flexibel wrapper som skapar ett rutnät (grid).
 * @param {number} columns - Antal kolumner i gridden.
 * @param {boolean} fullheight - Om sant, sträcker sig containern vertikalt (100%).
 */
function GridContainer({ children, columns = 0, fullheight = false }) {

    // Vi skickar med antalet kolumner som en CSS-variabel var(--columns).
    const style = {
        "--columns": columns
    }

    return (
        <div className={`grid-layout ${fullheight ? "full-height" : ""}`} style={style}
        >
            {children}
        </div>
    )
}

export default GridContainer