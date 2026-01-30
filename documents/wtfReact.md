## Hur vet jag om det är en hook?

Börjar funktionen med **`use`**? → Då är det en hook.

```
useState     ✅ Hook
useEffect    ✅ Hook
useContext   ✅ Hook
useMemo      ✅ Hook

setTimeout   ❌ Inte en hook (vanlig JS)
fetch        ❌ Inte en hook (vanlig JS)
myFunction   ❌ Inte en hook
```

Alla hooks börjar med `use`.

## Måste man importera dem?

Ja. Alla hooks importeras från `'react'`.

```jsx
import { useState, useEffect } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    console.log('mounted')
  }, [])
  
  return <div>{count}</div>
}
```
