import { Avatar } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { auth, db, app } from '../firebase/config'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const stripeIsConfigured =
    process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === 'true'
  const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === 'packs'

  const user = useSelector((state) => state.user.user)
  console.log(user)
  const { handleLogout, handleLogin } = useAuth()

  console.log(user)
  return (
    <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between">
      <div className="flex gap-2 h-full">
        <Link to="/">
          <h2 className="font-bold">Polywood AI</h2>
        </Link>
      </div>
      {user && (
        <div className="hidden lg:flex flex-row gap-2">
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          {packsIsEnabled && (
            <Link to="/overview/packs">
              <Button>Packs</Button>
            </Link>
          )}
          {stripeIsConfigured && (
            <Link to="/get-credits">
              <Button>Get Credits</Button>
            </Link>
          )}
        </div>
      )}
      <div className="flex gap-4 lg:ml-auto">
        <Badge variant="destructive">
          <Label
            style={{
              color: user?.hasSubscription ? 'green' : 'red',
            }}
          >
            Subscription {user?.hasSubscription ? 'Active' : 'Inactive'}
          </Label>
        </Badge>
        {!user && (
          <Link onClick={handleLogin}>
            <Button>Login / Signup </Button>
          </Link>
        )}
        {user && (
          <div className="flex flex-row gap-4 text-center align-middle justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar alt={user.displayName} src={user.photoURL} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-50 mt-3">
                <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis">
                  Dashboard
                </DropdownMenuLabel>
                <DropdownMenuLabel
                  className="text-primary text-center overflow-hidden text-ellipsis"
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  Log Out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
