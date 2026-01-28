import "./GridContainer.css"

/**
 * A flexible wrapper component that creates a grid layout
 * @param {number} columns - Number of columns in the grid
 * @param {boolean} fullheight - If true, the container stretches to 100% height
 */
function GridContainer({ children, columns = 0, fullheight = false }) {

    // Pass the column count as a CSS custom property --columns
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