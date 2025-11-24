# Source Materials

This directory contains reference materials for training zone methodologies and prescribed training velocities.

## Files

### vcr_table_2014.pdf

**Title:** Determination of prescribed velocities in basic endurance training
**Authors:** Lange, G.; Pöhlitz, L.
**Original:** 1995
**Updated:** 2014
**Presented at:** Endurance Summit 2018, Skanderborg, Denmark (November 25, 2018)

**Source:** https://fp-atletismo.pt/index.php/documentacao/ct-menu-item-6?limit=10&limitstart=20

This PDF contains tables of prescribed training paces for different race distance results. It provides a systematic approach to calculating training velocities based on performance in various race distances.

### vcr_table_2022.jpg

**Title:** Determination of prescribed velocities in basic endurance training
**Authors:** Lange, G.; Pöhlitz, L.
**Original:** 1995
**Updated:** 2022

This image contains an updated version of the training velocity tables. While the core methodology remains consistent with the 2014 version, the table has been expanded to support more test results with additional annotations.

**Note:** The exact source of this 2022 version has not been verified. It was found as a standalone image without accompanying documentation.

## Relationship to Current Implementation

The current training zone percentages used in this calculator are based on the methodology from [Front Runner Sports](https://frontrunnersports.com.au/runningsquads/pacezonecalculator/), which cites Lange & Pöhlitz as the general methodology source.

### Future Development

The calculator is planned to be refactored to support multiple zone calculation methodologies, including:

- Current Front Runner Sports implementation (default)
- Lange & Pöhlitz tables (2014 and 2022 versions)
- Other established zone systems (Jack Daniels, 3-zone polarized, etc.)

This will allow users to choose their preferred methodology for training zone calculations.

## Attribution

When using or referencing these materials, please cite:

> Lange, G., & Pöhlitz, L. (1995, updated 2014/2022). _Determination of prescribed velocities in basic endurance training_. Presented at Endurance Summit 2018, Skanderborg, Denmark.

## Additional Resources

For comparison with other zone systems, see:

- [docs/zones.md](../zones.md) - Comprehensive documentation of the current 5-zone system
- [docs/formulas.md](../formulas.md) - Critical Velocity calculation methodology
