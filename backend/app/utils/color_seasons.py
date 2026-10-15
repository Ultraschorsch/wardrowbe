"""Reference data for personal color-season analysis (Spring/Summer/Autumn/Winter).

Based on the classic four-season color analysis method (warm/cool undertone x
light-soft/deep-clear contrast). Palettes are expressed using the app's existing
fixed color vocabulary (see CLOTHING_COLORS in the frontend and the color
extraction prompt) so they line up directly with values already stored on
ClothingItem.primary_color and UserPreference.color_favorites/color_avoid.

This is general, widely-published color-theory knowledge (undertone/contrast
groupings), not a transcription of any single proprietary source.
"""

from typing import Literal

ColorSeason = Literal["spring", "summer", "autumn", "winter"]

VALID_COLOR_SEASONS: tuple[ColorSeason, ...] = ("spring", "summer", "autumn", "winter")

# Each entry uses the same color tokens as CLOTHING_COLORS (frontend/lib/types.ts)
# and the clothing_analysis color vocabulary, so matching against
# item.primary_color / item.colors works without any conversion step.
COLOR_SEASON_PALETTES: dict[ColorSeason, dict[str, list[str]]] = {
    "spring": {
        # Warm undertone, clear/light-to-medium contrast
        "recommended": [
            "cream",
            "tan",
            "khaki",
            "olive",
            "green",
            "blue",
            "coral",
            "pink",
            "yellow",
            "orange",
            "brown",
        ],
        "avoid": ["black", "charcoal", "navy", "burgundy", "dark-brown", "purple"],
    },
    "summer": {
        # Cool undertone, soft/muted contrast
        "recommended": [
            "gray",
            "white",
            "cream",
            "teal",
            "navy",
            "blue",
            "pink",
            "purple",
            "burgundy",
        ],
        "avoid": ["orange", "yellow", "army-green", "khaki", "brown", "black"],
    },
    "autumn": {
        # Warm undertone, muted/deep contrast, earthy
        "recommended": [
            "brown",
            "dark-brown",
            "tan",
            "khaki",
            "olive",
            "army-green",
            "burgundy",
            "orange",
            "yellow",
            "coral",
            "teal",
        ],
        "avoid": ["pink", "purple", "gray", "white", "black"],
    },
    "winter": {
        # Cool undertone, clear/high contrast, deep or bright
        "recommended": [
            "black",
            "white",
            "charcoal",
            "navy",
            "red",
            "burgundy",
            "purple",
            "blue",
            "pink",
            "teal",
            "green",
        ],
        "avoid": ["khaki", "tan", "beige", "olive", "orange", "yellow", "coral", "brown"],
    },
}


def get_palette(season: str | None) -> dict[str, list[str]] | None:
    """Return the recommended/avoid color lists for a season, or None if unset/invalid."""
    if season not in COLOR_SEASON_PALETTES:
        return None
    return COLOR_SEASON_PALETTES[season]  # type: ignore[index]
