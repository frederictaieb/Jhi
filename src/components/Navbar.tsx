'use client'

import React, { useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Switch } from '@headlessui/react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import '../styles/ThreeColumns.css'

// Switch component for better modularity
interface BroadcastSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const BroadcastSwitch: React.FC<BroadcastSwitchProps> = ({ enabled, setEnabled }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm text-gray-300">Broadcast</span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-indigo-600' : 'bg-gray-500'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable broadcast</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  )
}

// Profile menu component for better modularity
const ProfileMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
            {user ? user.email?.charAt(0).toUpperCase() : '?'}
          </div>
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {user ? (
          <>
            <MenuItem>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Mon profil
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Déconnexion
              </button>
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            >
              Connexion
            </Link>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  )
}

export default function Navbar(): React.ReactElement {
  // State for broadcast switch
  const [broadcastEnabled, setBroadcastEnabled] = useState(false)
  const { user } = useAuth();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          {/* Utilise la même structure de conteneur que ThreeColumnsContainer */}
          <div className="mainboard-container" style={{ height: 'auto', paddingTop: '0', paddingBottom: '0' }}>
            <div className="relative flex items-center h-16" style={{ width: '33.33%' }}>
              <Link href={user ? '/dashboard' : '/'} className="flex items-center">
                <div className="text-white font-semibold">Plateforme XRP</div>
              </Link>
            </div>
            
            {/* Colonne du milieu vide */}
            <div style={{ width: '33.33%' }}></div>
            
            {/* Colonne de droite avec les contrôles */}
            <div className="flex items-center justify-end" style={{ width: '33.33%' }}>
              {user && (
                <BroadcastSwitch 
                  enabled={broadcastEnabled} 
                  setEnabled={setBroadcastEnabled} 
                />
              )}
              <ProfileMenu />
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu state */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Empty since we removed all navigation items */}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}