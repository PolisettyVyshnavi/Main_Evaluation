Table: users
Columns:
- id: UUID, PK
- name: TEXT, required
- email: TEXT, unique
- password: TEXT
- role: ENUM(customer, owner, driver)
- created_at: TIMESTAMP
Relationships: