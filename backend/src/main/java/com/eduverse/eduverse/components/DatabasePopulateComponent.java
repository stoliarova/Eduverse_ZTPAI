package com.eduverse.eduverse.components;

import com.eduverse.eduverse.Constants;
import com.eduverse.eduverse.dao.AuthorityRepository;
import com.eduverse.eduverse.dao.CourseUserInfoRepository;
import com.eduverse.eduverse.entity.*;
import com.eduverse.eduverse.service.CourseService;
import com.eduverse.eduverse.service.CourseTagService;
import com.eduverse.eduverse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DatabasePopulateComponent implements ApplicationRunner {

    private final AuthorityRepository authorityRepository;
    private final UserService userService;
    private final CourseService courseService;
    private final CourseTagService courseTagService;
    private final CourseUserInfoRepository courseUserInfoRepository;

    @Autowired
    public DatabasePopulateComponent(AuthorityRepository authorityRepository, UserService userService, CourseService courseService, CourseTagService courseTagService, CourseUserInfoRepository courseUserInfoRepository) {
        this.authorityRepository = authorityRepository;
        this.userService = userService;
        this.courseService = courseService;
        this.courseTagService = courseTagService;
        this.courseUserInfoRepository = courseUserInfoRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        addDefaultUsersAndAuthorities();
        addCourseUserInfo();
        addTags();
        addDummyCoursesAndLessons();
    }

    private void addDefaultUsersAndAuthorities() {
        // Create authority types in database
        var authorityUSER = authorityRepository.save(new Authority(Constants.authority_USER));
        var authorityCREATOR = authorityRepository.save(new Authority(Constants.authority_CREATOR));
        var authorityMANAGER = authorityRepository.save(new Authority(Constants.authority_MANAGER));
        var authorityADMIN = authorityRepository.save(new Authority(Constants.authority_ADMIN));

        // Create admin and manager users
        var admin = userService.updateOrSave(new User("admin@mail.com", "noprovider", "admin", "admin", "Admin", "User"));
        admin.getAuthorities().addAll(Arrays.asList(authorityUSER, authorityCREATOR, authorityMANAGER, authorityADMIN));
        userService.updateOrSave(admin);

        var manager = userService.updateOrSave(new User("manager@mail.com", "noprovider", "manager", "manager", "Manager", "User"));
        manager.getAuthorities().addAll(Arrays.asList(authorityUSER, authorityCREATOR, authorityMANAGER));
        userService.updateOrSave(manager);

        // Create 10 random creators
        for (int i = 0; i < 10; i++) {
            User creator = userService.updateOrSave(new User("creator" + i + "@mail.com", "noprovider", "creator" + i, "creator" + i, "Creator", "User" + i));
            creator.getAuthorities().addAll(Arrays.asList(authorityUSER, authorityCREATOR));
            userService.updateOrSave(creator);
        }

        // Create 10 random users
        for (int i = 0; i < 10; i++) {
            User user = userService.updateOrSave(new User("user" + i + "@mail.com", "noprovider", "user" + i, "user" + i, "User", "User" + i));
            user.getAuthorities().addAll(Arrays.asList(authorityUSER));
            userService.updateOrSave(user);
        }
    }

    private void addCourseUserInfo() {
        List<User> allUsers = userService.findAll();
        for (User user : allUsers) {
            CourseUserInfo courseUserInfo = new CourseUserInfo();
            courseUserInfo.setUserId(user.getId());
            courseUserInfo.setFirstName(user.getFirstName());
            courseUserInfo.setLastName(user.getLastName());
            courseUserInfo = courseUserInfoRepository.save(courseUserInfo);
            user.setCourseUserInfo(courseUserInfo);
            userService.updateOrSave(user);
        }
    }

    private void addTags() {
        // Create Direction tags
        CourseTag art = courseTagService.save(new CourseTag("Art", CourseTagType.DIRECTION, null));
        CourseTag development = courseTagService.save(new CourseTag("Development", CourseTagType.DIRECTION, null));
        CourseTag woodcrafting = courseTagService.save(new CourseTag("Woodcrafting", CourseTagType.DIRECTION, null));
        CourseTag music = courseTagService.save(new CourseTag("Music", CourseTagType.DIRECTION, null));
        CourseTag cooking = courseTagService.save(new CourseTag("Cooking", CourseTagType.DIRECTION, null));

        // Create Specific tags for each Direction
        List<CourseTag> artSpecifics = Arrays.asList(
                courseTagService.save(new CourseTag("Painting", CourseTagType.SPECIFIC, art)),
                courseTagService.save(new CourseTag("Sculpting", CourseTagType.SPECIFIC, art)),
                courseTagService.save(new CourseTag("Drawing", CourseTagType.SPECIFIC, art)),
                courseTagService.save(new CourseTag("Digital Art", CourseTagType.SPECIFIC, art))
        );

        List<CourseTag> developmentSpecifics = Arrays.asList(
                courseTagService.save(new CourseTag("Web Development", CourseTagType.SPECIFIC, development)),
                courseTagService.save(new CourseTag("Full Stack", CourseTagType.SPECIFIC, development)),
                courseTagService.save(new CourseTag("React", CourseTagType.SPECIFIC, development)),
                courseTagService.save(new CourseTag("C#", CourseTagType.SPECIFIC, development)),
                courseTagService.save(new CourseTag("Angular", CourseTagType.SPECIFIC, development)),
                courseTagService.save(new CourseTag("Unity", CourseTagType.SPECIFIC, development)),
                courseTagService.save(new CourseTag("Python", CourseTagType.SPECIFIC, development)),
                courseTagService.save(new CourseTag("Java", CourseTagType.SPECIFIC, development))
        );

        List<CourseTag> woodcraftingSpecifics = Arrays.asList(
                courseTagService.save(new CourseTag("Furniture Making", CourseTagType.SPECIFIC, woodcrafting)),
                courseTagService.save(new CourseTag("Carving", CourseTagType.SPECIFIC, woodcrafting)),
                courseTagService.save(new CourseTag("Woodturning", CourseTagType.SPECIFIC, woodcrafting))
        );

        List<CourseTag> musicSpecifics = Arrays.asList(
                courseTagService.save(new CourseTag("Guitar", CourseTagType.SPECIFIC, music)),
                courseTagService.save(new CourseTag("Piano", CourseTagType.SPECIFIC, music)),
                courseTagService.save(new CourseTag("Drums", CourseTagType.SPECIFIC, music)),
                courseTagService.save(new CourseTag("Music Production", CourseTagType.SPECIFIC, music))
        );

        List<CourseTag> cookingSpecifics = Arrays.asList(
                courseTagService.save(new CourseTag("Baking", CourseTagType.SPECIFIC, cooking)),
                courseTagService.save(new CourseTag("Grilling", CourseTagType.SPECIFIC, cooking)),
                courseTagService.save(new CourseTag("Vegetarian Cooking", CourseTagType.SPECIFIC, cooking)),
                courseTagService.save(new CourseTag("International Cuisine", CourseTagType.SPECIFIC, cooking))
        );

        // Create Localization tags
        List<CourseTag> localizations = Arrays.asList(
                courseTagService.save(new CourseTag("UA", CourseTagType.LOCALIZATION, null)),
                courseTagService.save(new CourseTag("FR", CourseTagType.LOCALIZATION, null)),
                courseTagService.save(new CourseTag("EN", CourseTagType.LOCALIZATION, null))
        );
    }

    private void addDummyCoursesAndLessons() {
        Random random = new Random();
        List<User> creators = userService.findByRole(Constants.authority_CREATOR);
        List<CourseTag> allDirections = courseTagService.getTagsByType(CourseTagType.DIRECTION);
        List<CourseTag> allSpecifics = courseTagService.getTagsByType(CourseTagType.SPECIFIC);
        List<CourseTag> allLocalizations = courseTagService.getTagsByType(CourseTagType.LOCALIZATION);

        for (int i = 1; i <= 60; i++) {
            Course course = Course.builder()
                    .name("Course " + i)
                    .description("Description for course " + i)
                    .price(random.nextInt(9) * 10 + 9)
                    .imageUrl("https://source.unsplash.com/random/200x200?" + i)
                    .tags(new ArrayList<>()) // Initialize the tags field
                    .creators(new ArrayList<>()) // Initialize the creators field
                    .owners(new ArrayList<>()) // Initialize the owners field
                    .build();

            // Randomly assign Direction, Specific, and Localization tags
            CourseTag directionTag = allDirections.get(random.nextInt(allDirections.size()));
            List<CourseTag> specificTags = allSpecifics.stream()
                    .filter(tag -> tag.getParent().equals(directionTag))
                    .toList();
            CourseTag specificTag = specificTags.get(random.nextInt(specificTags.size()));
            CourseTag localizationTag = allLocalizations.get(random.nextInt(allLocalizations.size()));

            course.getTags().add(directionTag);
            course.getTags().add(specificTag);
            course.getTags().add(localizationTag);

            var dbCourse = courseService.save(course);

            // Randomly assign 1 or 2 creators
            if (!creators.isEmpty()) {
                User creator = creators.get(random.nextInt(creators.size()));
                CourseUserInfo creatorInfo = creator.getCourseUserInfo(); // Get CourseUserInfo from User entity
                dbCourse.getCreators().add(creatorInfo);
                if (random.nextBoolean() && creators.size() > 1) {
                    User secondCreator = creators.get(random.nextInt(creators.size()));
                    if (creator != secondCreator) {
                        CourseUserInfo secondCreatorInfo = secondCreator.getCourseUserInfo(); // Get CourseUserInfo from User entity
                        dbCourse.getCreators().add(secondCreatorInfo);
                        secondCreator.getCreatedCourses().add(dbCourse); // Add the course to the second creator's createdCourses
                        userService.updateOrSave(secondCreator); // Save the updated second creator
                    }
                }
            }



            dbCourse = courseService.save(dbCourse);





            for (int j = 1; j <= 10; j++) {
                Lesson lesson = Lesson.builder()
                        .index(j)
                        .name("Lesson " + j + " of Course " + i)
                        .description("Description for lesson " + j + " of course " + i)
                        .imageUrl("https://source.unsplash.com/random/200x200?" + j)
                        .course(course)
                        .build();

                courseService.addLessonToCourse(course.getId(), lesson);
            }
        }

        var allCourses = courseService.findAll();

        allCourses.forEach(course1 -> {
            course1.getCreators().forEach(courseUserInfo -> {
                var courseCreator = userService.findById(courseUserInfo.getUserId());
                courseCreator.getCreatedCourses().add(course1);
                userService.updateOrSave(courseCreator);
            });
        });
    }
}
