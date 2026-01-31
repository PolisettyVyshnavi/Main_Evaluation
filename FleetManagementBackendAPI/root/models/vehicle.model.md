Table: vehicles
Columns:
- id: UUID, PK
- name: TEXT, required
- registration_number: TEXT, unique
- allowed_passengers: INTEGER
- isAvailable: BOOLEAN, default true
- driver_id: UUID, FK → users.id
- rate_per_km: NUMERIC
- owner_id: UUID, FK → users.id (ON DELETE CASCADE)
- created_at: TIMESTAMP
Relationships:
- Owner → Vehicles (1:N)
- Driver → Vehicle (1:1)
- Vehicle → Trips (1:N)