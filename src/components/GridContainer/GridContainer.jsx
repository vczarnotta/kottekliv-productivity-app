import "./GridContainer.css"

//Antalet kolumner skickas in så grid blir dynamisk, fullheight true betyder att den tar upp resterande höjd
function GridContainer({ children, columns = 0, fullheight = false }) {
    const style = {
        "--columns": columns
    }

    return (
        <div className={`grid-layout ${fullheight ? "full-height" : ""}`} style={style}>
            {/* Här hamnar innehållet */}
            {children}
        </div>
    )
}

export default GridContainer