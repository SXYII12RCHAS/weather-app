export const ICON_MAP = new Map()

import sun from "./sun.svg"
import cloudSun from "./cloud-sun.svg"
import cloud from "./cloud.svg"
import smog from "./smog.svg"
import cloudShowersHeavy from "./cloud-showers-heavy.svg"
import snowflake from "./snowflake.svg"
import cloudBolt from "./cloud-bolt.svg"

addMapping([0, 1], sun)
addMapping([2], cloudSun)
addMapping([3], cloud)
addMapping([45, 48], smog)
addMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  cloudShowersHeavy
)
addMapping([71, 73, 75, 77, 85, 86], snowflake)
addMapping([95, 96, 99], cloudBolt)

function addMapping(values, icon) {
  values.forEach(value => {
    ICON_MAP.set(value, icon)
  })
}