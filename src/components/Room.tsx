'use client';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

export default function Room() {
  return (
    <div className="flex items-center space-x-4">
      {/* Colonne gauche (Photo) */}
      <div className="flex-shrink-0">
        <Image
          src=""
          alt="Photo"
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
      </div>

      {/* Colonne droite (Username, Age, City - Country) */}
      <div className="flex flex-col justify-between h-full">
        <div className="font-semibold">Username - Age</div>
        <div>City - Country</div>
      </div>
    </div>
  );
}
