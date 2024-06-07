package com.eduverse.eduverse;

public final class Constants {
    public static final String table_user = "edv_user";
    public static final String table_authority = "edv_authority";
    public static final String table_user_authority = "edv_user_authority";

    public static final String table_course = "edv_course";
    public static final String table_lesson = "edv_lesson";
    public static final String table_course_lesson = "edv_course_lesson";

    public static final String table_user_purchased_courses = "edv_user_course_purchased";
    public static final String table_user_cart_courses = "edv_user_course_cart";
    public static final String table_user_created_courses = "edv_user_course_created";

    public static final String table_course_user_info_created_courses = "edv_course_user_info_course_created";
    public static final String table_course_user_info_purchased_courses = "edv_course_user_info_course_created";

    public static final String table_course_tag = "edv_course_tag";
    public static final String table_course_tags = "edv_course_tags";
    public static final String table_course_user_info = "edv_course_user_info";

    public static final String authority_USER = "USER";
    public static final String authority_CREATOR = "CREATOR";
    public static final String authority_MANAGER = "MANAGER";
    public static final String authority_ADMIN = "ADMIN";

    public static final String url_frontend = "http://localhost:5173";

    // duration in minutes
    public static final int JWT_token_duration = 999;
}
