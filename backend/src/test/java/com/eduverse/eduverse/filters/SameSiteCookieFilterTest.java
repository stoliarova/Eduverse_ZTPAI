//package com.eduverse.eduverse.filters;
//
//import com.eduverse.eduverse.config.filter.SameSiteCookieFilter;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//
//import java.util.Collections;
//
//import static org.mockito.Mockito.*;
//
//class SameSiteCookieFilterTest {
//
//    @Test
//    void testSameSiteCookieFilter() throws Exception {
//        SameSiteCookieFilter filter = new SameSiteCookieFilter();
//        HttpServletRequest request = mock(HttpServletRequest.class);
//        HttpServletResponse response = mock(HttpServletResponse.class);
//        FilterChain chain = mock(FilterChain.class);
//
//        when(request.isSecure()).thenReturn(true);
//        when(response.getHeaders("Set-Cookie")).thenReturn(Collections.singletonList("JSESSIONID=123; Path=/; HttpOnly"));
//
//        filter.doFilter(request, response, chain);
//
//        verify(response).setHeader(eq("Set-Cookie"), contains("SameSite=None; Secure"));
//    }
//}
