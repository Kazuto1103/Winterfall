# Progress Report: Snowflake Navigation Geometry (Failure Context)

## Status: RECOVERED / PIVOTED
**Date**: 2026-01-26
**Component**: `SnowflakeNav.tsx`
**Objective**: Replicate a specific 6-pointed "Diamond Snowflake" reference image with precise inner/outer rhombus ratios.

## Failure Summary (Resolved)
The previous attempts using CSS Layout (`div` + `clip-path` + `vw` offsets) failed to achieve the visual cohesion of the reference image. The gaps were inconsistent, and the "touching point" logic was mathematically brittle.

## Resolution: SVG Architecture
We have completely discarded the DOM/CSS geometry in favor of a **Unified SVG Coordinate System**.
- **Transformation**: `div`s -> `<svg viewBox="-500 -500 1000 1000">`.
- **Reasoning**: This allows us to define the "Primary Petal" and "Secondary Petal" paths **once** with perfect mathematical ratios, and rotate them around a (0,0) center.
- **Result**:
    - **Primary Petal**: Hollow/Outlined Rhombus (Radius 100 -> 460).
    - **Secondary Petal**: Solid Rhombus (Radius 260 -> 420, nestled in gaps).
    - **Scaling**: The entire snowflake scales perfectly with `80vh` without elements drifting apart.

## Iteration History

### 1-4. The "CSS Layout" Failures (Legacy)
(See previous history)

### 5. The SVG Pivot (v5 - Current)
- **Tech**: Single `<svg>` with `<path>` elements.
- **Reference Match**:
    - "Hollow" diamonds implemented as `stroke="#06b6d4" fill="dark"`.
    - "Solid" diamonds implemented as `fill="#22d3ee"` in the 30-degree gaps.
- **Status**: Awaiting User Visual Verification.
