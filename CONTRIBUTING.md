# Contributing

Contributions must preserve the synthetic-only boundary and reproducibility.

1. Open an issue describing the schema, generator, notebook, or documentation change.
2. Never upload real or customer telemetry, credentials, contact schedules, station coordinates, or controlled technical data.
3. Schema changes require a versioning note, compatible fixture update, and validation tests.
4. Generator changes must accept a seed and document assumptions.
5. Notebooks must run from a clean kernel and may read only repository-relative data.
6. Pull requests must include commands run and explain any changed sample counts or labels.

Use Python 3.11+ style, type hints for public functions, lowercase snake_case data fields, and concise research-oriented documentation.
