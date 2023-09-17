import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSidenavToggle } from '../../../context/SidenavToggleContext';
import './SideNav.css';
import {
  TiThSmallOutline,
  TiHomeOutline,
  TiThList,
  TiFlowMerge,
  TiUser,
  TiArrowSortedDown,
} from 'react-icons/ti';
const SideNav: React.FC = () => {
  const { isExpanded: isExpandedContext, toggleSidenav } = useSidenavToggle();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={isExpandedContext ? 'l-navbar expand' : 'l-navbar'}
      id='navbar'
    >
      <nav className='nav'>
        <div>
          <div
            className='nav__brand'
            onClick={() => {
              setIsExpanded(!isExpanded);
              toggleSidenav();
            }}
          >
            <TiThSmallOutline className='nav__toggle' id='nav-toggle' />
          </div>
          <div className='nav__list'>
            <Link to='/dashboard/home' className='nav__link'>
              <TiHomeOutline className='nav__icon' />
              <span className='nav__name'>Home</span>
            </Link>
            <div
              className='nav__link collapse'
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              <TiThList className='nav__icon' />
              <span className='nav__name'>Listas</span>
              <TiArrowSortedDown className='collapse__link' />
              <ul
                className={
                  isCollapsed
                    ? 'collapse__menu showCollapse'
                    : 'collapse__menu '
                }
              >
                <Link to='/dashboard/empleados' className='collapse__sublink'>
                  <TiUser className='nav__icon' />
                  Empleados
                </Link>

                <Link to='/dashboard/cargos' className='collapse__sublink'>
                  <TiFlowMerge className='nav__icon' />
                  Cargos
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
