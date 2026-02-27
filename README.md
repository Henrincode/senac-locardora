# Projeto SENAC - Alucar

## Criação do banco de dados:

```sql
-- 1. Marcas (Toyota, Honda, etc.)
CREATE TABLE alc_car_brands (
    id_car_brand BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 2. Categorias e Preços (SUV, Sedã, etc.)
CREATE TABLE alc_car_categories (
    id_car_category BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2), -- Preço da diária
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 3. Status da Reserva (Nova Tabela)
CREATE TABLE alc_rental_statuses (
    id_rental_status BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Ex: Aguardando, Confirmada
    color_hex VARCHAR(7),        -- Ex: #FFFFFF
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 4. Clientes
CREATE TABLE alc_clients (
    id_client BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 5. Modelos dos Carros
CREATE TABLE alc_car_models (
    id_car_model BIGSERIAL PRIMARY KEY,
    id_car_brand_fk BIGINT REFERENCES alc_car_brands(id_car_brand) ON DELETE CASCADE,
    id_car_category_fk BIGINT REFERENCES alc_car_categories(id_car_category) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    details TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 6. Cores dos Carros
CREATE TABLE alc_car_colors (
    id_car_color BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- Ex: 'Black', 'Silver', 'White'
    hex_code VARCHAR(7),             -- Opcional: Para exibir a cor no painel (Ex: #000000)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 7. Status de Disponibilidade do Carro
CREATE TABLE alc_car_statuses (
    id_car_status BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- Ex: 'Available', 'Maintenance', 'Rented', 'Out of Service'
    block BOOLEAN DEFAULT FALSE,      -- Se TRUE, o carro não pode ser alugado
    color_hex VARCHAR(7),             -- Opcional: Para o badge no painel admin
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 8. Unidades de Carros (Físico)
CREATE TABLE alc_cars (
    id_car BIGSERIAL PRIMARY KEY,
    -- Relacionamento com o Modelo
    id_car_model_fk BIGINT NOT NULL REFERENCES alc_car_models(id_car_model) ON DELETE CASCADE,
    
    -- Relacionamento com a Cor
    id_car_color_fk BIGINT NOT NULL REFERENCES alc_car_colors(id_car_color), 
    
    -- NOVO: Relacionamento com o Status (FK em vez de VARCHAR)
    id_car_status_fk BIGINT NOT NULL DEFAULT 1 REFERENCES alc_car_statuses(id_car_status),

    plate VARCHAR(10) NOT NULL UNIQUE,       -- Placa
    year_manufacture INTEGER NOT NULL,      -- Ano de Fabricação
    year_model INTEGER NOT NULL,            -- Ano do Modelo
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 9. Reservas
CREATE TABLE alc_rentals (
    id_rental BIGSERIAL PRIMARY KEY,
    id_client_fk BIGINT REFERENCES alc_clients(id_client) ON DELETE SET NULL,
    id_car_fk BIGINT REFERENCES alc_cars(id_car) ON DELETE RESTRICT,
    id_rental_status_fk BIGINT REFERENCES alc_rental_statuses(id_rental_status) DEFAULT 1,
    
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    
    total_price DECIMAL(10,2),
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Inserção de Status Iniciais (Exemplo)
INSERT INTO alc_rental_statuses (name, color_hex) VALUES 
('Aguardando', '#FFA500'),
('Confirmada', '#008000'),
('Cancelada', '#FF0000');
```