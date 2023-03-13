import {Fragment} from "react";
import {Divider, Menu, MenuItem} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import SortLatestSvg from "../assets/sort-latest.svg";
import SortOldestSvg from "../assets/sort-oldest.svg";
import SortAzSvg from "../assets/sort-az.svg";
import SortZaSvg from "../assets/sort-za.svg";
import SortUnfinishedSvg from "../assets/sort-unfinished.svg";

const menus = [
  {label: "Terbaru", svg: SortLatestSvg},
  {label: "Terlama", svg: SortOldestSvg},
  {label: "A-Z", svg: SortAzSvg},
  {label: "Z-A", svg: SortZaSvg},
  {label: "Belum Selesai", svg: SortUnfinishedSvg},
];

export default function ToggleFilter({
  open,
  anchorEl,
  handleClose = () => {},
  selected = "",
  setSelected = () => {},
}) {
  const handleClick = (label) => {
    setSelected(label);
    handleClose();
  };

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: {padding: 0},
        }}
      >
        {menus.map((e, idx) => (
          <Fragment key={idx}>
            <MenuItem onClick={() => handleClick(e?.label)}>
              <div className="w-48 py-2 " data-cy="sort-selection">
                <div
                  className="flex flex-row"
                  data-cy={`${
                    selected === e?.label ? "sort-selection-selected" : "false"
                  }`}
                >
                  <img
                    src={e?.svg}
                    alt={e?.svg}
                    className="w-6 h-6 mr-4"
                    data-cy="sort-selection-icon"
                  />
                  <span data-cy="sort-selection-title">{e?.label}</span>
                  {selected === e?.label && (
                    <CheckIcon
                      sx={{position: "absolute", right: 20}}
                      color="#4A4A4A"
                      fontSize="14px"
                      className="mt-1"
                    />
                  )}
                </div>
              </div>
            </MenuItem>
            {idx !== menus?.length - 1 && <Divider style={{margin: 0}} />}
          </Fragment>
        ))}
      </Menu>
    </div>
  );
}
