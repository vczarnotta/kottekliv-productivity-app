import { GoHome, GoCheckbox, GoClock, GoGraph } from "react-icons/go"

// Centralized list for easily adding or removing menu items
const menuItems = [
  {title: "Home",
    icon: <GoHome />,
  },

  {title: "Tasks", 
    icon: <GoCheckbox />,
  },

  {title: "Timer", 
    icon: <GoClock />,
  },

  {title: "History",
    icon: <GoGraph />,
  },
]

export default menuItems