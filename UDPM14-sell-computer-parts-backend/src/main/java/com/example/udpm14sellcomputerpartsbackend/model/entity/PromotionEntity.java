package com.example.udpm14sellcomputerpartsbackend.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "promotion")
@Data
public class PromotionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "name", nullable = false, length = 300)
    private String name;

    @Column(name = "discount_value")
    private long discountValue;

    @Column(name = "maximum_discount_value")
    private long maximumDiscountValue;

    @Column(name = "discount_type")
    private int discountType;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "expired_at")
    private Timestamp expiredAt;

    @Column(name = "coupon_code", unique = true)
    private String couponCode;

    @Column(name = "is_active", columnDefinition = "TINYINT(1)")
    private boolean isActive;

    @Column(name = "is_public", columnDefinition = "TINYINT(1)")
    private boolean isPublic;

}
