"""add_color_season_to_preferences

Revision ID: 484f4bc1c7e3
Revises: b1c2d3e4f5a6
Create Date: 2026-08-22 21:30:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "484f4bc1c7e3"
down_revision: str | None = "b1c2d3e4f5a6"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "user_preferences",
        sa.Column("color_season", sa.String(length=10), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("user_preferences", "color_season")
