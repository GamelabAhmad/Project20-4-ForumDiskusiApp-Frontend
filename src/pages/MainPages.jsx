import { NavLink } from "react-router-dom";

export default function MainPages() {
  return (
    <>
      <h1 className="">Main Pages</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/forum"}>Forum</NavLink>
          </li>
          <li>
            <NavLink to={"/question"}>Question</NavLink>
          </li>
          <li>
            <NavLink to={"/topic"}>Topic</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
