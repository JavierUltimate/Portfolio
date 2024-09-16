import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import MenuBasic from "./MenuBasic";
import DrawerBasic from "./DrawerBasic";
export default function NavBar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  return (
    <nav className="  bg-white py-4 flex justify-between px-2 gap-2 items-center shadow-md">
      <section className="font-bold text-2xl bg-yellow-500 p-2 rounded-md ">
        Movie{" "}
        <span className="w-[50%] text-yellow-500 bg-black p-2 rounded-md">
          Admin
        </span>
      </section>
      <ul className=" bg-transparent flex gap-5 items-center ">
        {isAuthenticated ? (
          <div className="flex gap-5 items-center ">
           
            <li className="text-black font-bold text-lg flex items-center gap-2">
              Welcome{" "}
              <MenuBasic name={user.name}/>
              
            </li>
            <li>
              <DrawerBasic/>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link className="transition hover:text-gray-500" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-gray-500" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
