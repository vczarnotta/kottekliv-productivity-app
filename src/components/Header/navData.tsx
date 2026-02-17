import { GoHome, GoCheckbox, GoClock, GoGraph } from "react-icons/go"

interface menuItem {
  title: string,
  path: string,
  icon: React.ReactNode
}

// Centralized list for easily adding or removing menu items
const menuItems: menuItem[] = [
  {title: "Home",
    path: "/",
    icon: <GoHome />,
  },

  {title: "Tasks",
    path: "/Tasks",
    icon: <GoCheckbox />,
  },

  {title: "Timer",
    path: "/Timer",
    icon: <GoClock />,
  },

  {title: "History",
    path: "/History",
    icon: <GoGraph />,
  },
]

export default menuItems