"""major changes

Revision ID: b6372aa3f24d
Revises: 2617d512e39e
Create Date: 2023-11-27 11:09:28.062748

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6372aa3f24d'
down_revision = '2617d512e39e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('project_submissions')
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(), nullable=True))
        batch_op.alter_column('description',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=True)
        batch_op.alter_column('deadline',
               existing_type=sa.DATETIME(),
               nullable=True)
        batch_op.drop_column('title')

    with op.batch_alter_table('quizzes', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=True)
        batch_op.drop_column('title')

    with op.batch_alter_table('requirements', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('details', sa.String(), nullable=True))
        batch_op.drop_column('prerequisite')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('requirements', schema=None) as batch_op:
        batch_op.add_column(sa.Column('prerequisite', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('details')
        batch_op.drop_column('description')

    with op.batch_alter_table('quizzes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.VARCHAR(length=255), nullable=False))
        batch_op.alter_column('description',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=False)

    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.VARCHAR(length=255), nullable=False))
        batch_op.alter_column('deadline',
               existing_type=sa.DATETIME(),
               nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=False)
        batch_op.drop_column('name')

    op.create_table('project_submissions',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('content', sa.TEXT(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('project_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
