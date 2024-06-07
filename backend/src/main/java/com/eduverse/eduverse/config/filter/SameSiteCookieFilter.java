//package com.eduverse.eduverse.config.filter;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//public class SameSiteCookieFilter implements Filter {
//
//    private static final Logger logger = LoggerFactory.getLogger(SameSiteCookieFilter.class);
//
//    @Override
//    public void init(FilterConfig filterConfig) {
//        logger.debug("Initializing SameSiteCookieFilter");
//    }
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
//        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
//
//        chain.doFilter(request, response);
//
//        boolean isSecure = httpServletRequest.isSecure();
//        Collection<String> originalCookies = httpServletResponse.getHeaders("Set-Cookie");
//        List<String> modifiedCookies = new ArrayList<>();
//
//        for (String cookie : originalCookies) {
//            String modifiedCookie = modifyCookie(cookie, isSecure);
//            modifiedCookies.add(modifiedCookie);
//            httpServletResponse.setHeader("Set-Cookie", modifiedCookie);
//        }
//
//        if (logger.isDebugEnabled()) {
//            for (String modifiedCookie : modifiedCookies) {
//                logger.debug("Modified cookie added: {}", modifiedCookie);
//            }
//        }
//
//        // TODO: it worked without this line. Do I need it?
//        chain.doFilter(request, response);
//    }
//
//    private String modifyCookie(String cookie, boolean secure) {
//        if (!cookie.toLowerCase().contains("samesite")) {
//            return cookie + (secure ? "; SameSite=None; Secure" : "; SameSite=Lax");
//        }
//        return cookie;
//    }
//
//    @Override
//    public void destroy() {
//        logger.debug("Destroying SameSiteCookieFilter");
//    }
//}
