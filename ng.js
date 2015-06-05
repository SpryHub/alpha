(function() {
    angular.module('spryhub', ['templates', 'ui.router', 'github', 'auth',
        'eventbus', 'ui.bootstrap', 'ngStorage', 'angular.filter',
        'spryhub.domain', 'angular.filter', 'angulartics', 'angulartics.google.analytics']);
})();

(function() {
    'use strict';
    angular.module('eventbus', []);
})();
(function() {
  'use strict';
  angular.module('auth', ['eventbus', 'ngStorage'])
    .run(AuthBootstrap);

  AuthBootstrap.$inject = ['$location', 'authService'];

  function AuthBootstrap($location, auth) {
    if ($location.search().code) {
      auth.complete($location.search().code);
    }
  }
})();

(function() {
  angular.module('github', ['eventbus']);
})();

(function() {
    angular.module('spryhub.domain', ['github']);
})();

(function() {
    'use strict';
    angular.module('templates', []);
})();
(function() {
    angular.module('spryhub')
    .config(configure);

    configure.$inject = ['spryhub.config', 'authServiceProvider'];

    function configure(config, authServiceProvider) {
        authServiceProvider.configure(config.auth);
    }

})();
(function() {

    var config = {
        ngUrlRoot: '/ng/',
        auth: {
            github: {
                clientId: '3b3337e214ec23a04ad8',
                gatekeeperUrl: 'http://localhost:3000/gatekeeper/github/authenticate/'
            }
        }
    };

    if (window.location.host === 'spryhub.io') {
        config.auth.github.clientId = 'e97f9d6c719f9a7afa79';
        config.auth.github.gatekeeperUrl = 'https://api.github.io/gatekeeper/github/authenticate/';
    }
    else if (window.location.host.indexOf('alpha') === 0 ) {
        config.auth.github.clientId = 'b2ffd1bcf0274ff2c276';
        config.auth.github.gatekeeperUrl = 'https://alpha-api.github.io/gatekeeper/github/authenticate/';
    }
    else if (window.location.host.indexOf('beta') === 0) {
        config.auth.github.clientId = 'c14976868037a88f0380';
        config.auth.github.gatekeeperUrl = 'https://beta-api.github.io/gatekeeper/github/authenticate/';
    }

    angular.module('spryhub')
    .constant('spryhub.config', config);
})();

(function() {
    angular.module('spryhub')
      .run(run);

  run.$inject = ['eventbus', 'authService', '$rootScope', '$state'];

    function run(eventbus, authService, $rootScope, $state) {

        eventbus.on('auth:login', initialize);
        eventbus.on('auth:logout', initialize);

        function initialize() {
            $rootScope.user = authService.getUser();
            $rootScope.$state = $state;
        }

        initialize();
    }
})();
(function() {
  angular.module('spryhub')
    .config(configure);

  configure.$inject = ['$locationProvider', '$stateProvider',
    '$urlRouterProvider', 'spryhub.config'
  ];

  function configure($locationProvider, $stateProvider, $urlRouterProvider,
    config) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'ng/spryhub/home.view/home.html',
      controller: 'spryhub.home',
      controllerAs: 'vm'
    });

    $stateProvider.state('projects', {
      url: '/projects',
      templateUrl: 'ng/spryhub/projects.view/projects.html',
      controller: 'spryhub.projects',
      controllerAs: 'vm'
    });

    $stateProvider.state('project', {
      url: '/projects/:owner/:repo',
      templateUrl: 'ng/spryhub/project.view/project.html',
      controller: 'spryhub.project',
      controllerAs: 'vm'
    });

     $stateProvider.state('learn', {
      url: '/learn',
      templateUrl: 'ng/spryhub/learn.view/learn.html',
      controller: 'spryhub.learn',
      controllerAs: 'vm'
    });

      $stateProvider.state('support', {
      url: '/support',
      templateUrl: 'ng/spryhub/support.view/support.html',
      controller: 'spryhub.support',
      controllerAs: 'vm'
    });
  }
})();

(function() { 'use strict'; angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("ng/spryhub/home.view/home.html","<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-push-1\">\r\n            <div ng-class=\"{ \'jumbo-marg\': !vm.user }\" class=\"jumbotron\">\r\n                <div class=\"container-fluid\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6 col-lg-6 col-sm-12 col-xs-12\">\r\n                            <div style=\"text-align:left\">\r\n                                <h1>SpryHub</h1>\r\n                                <p>A unique agile management tool<tool class=\"\"></tool></p>\r\n                                <p><a class=\"btn btn-primary btn-lg jumbo-button\" href=\"#\" role=\"button\">Learn more</a></p>\r\n                            </div>\r\n                        </div>\r\n                        <div ng-if=\"!vm.user\" class=\"col-md-6 col-lg-6 col-sm-12 col-xs-12\">\r\n                            <h1>Try it now </h1>\r\n                            <p>for free as a beta user</p>\r\n                            <button githubLoginButton type=\"submit\" class=\"btn btn-primary btn-lg jumbo-button\" id=\"action-call\" ng-if=\"!vm.user\" ng-click=\"vm.login()\">\r\n                                Authorize on GitHub&nbsp;<span id=\"btn-octo\" class=\"octicon octicon-mark-github\"></span>\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4\">\r\n                    <h2 class=\"home-head text-center\">Make GitHub Agile</h2>\r\n                    <p class=\"home-desc\">The Spry Group is hooked on GitHub. We’re also Agile developers hooked on our own methodology. Problem is, GitHub and Agile don\'t look at projects the same way. So what did we do? We took native GitHub and translated it into an Agile project management tool.</p>\r\n                    <p class=\"text-center\">\r\n                        <a class=\"btn btn-default\" href=\"#\" role=\"button\">\r\n                            <span class=\"mega-octicon octicon-versions\"></span>\r\n                        </a>\r\n                    </p>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                    <h2 class=\"home-head text-center\">Bridging the Gap</h2>\r\n                    <p class=\"home-desc\">SpryHub transforms GitHub milestones and labels into a view of sprints and project velocity. Product Owners, Project Managers and Lead Developers get a quick view of comparative sprint metrics. Once it has logged three completed sprints, SpryHub provides an estimated timeframe for project completion. This saves time and helps Agile teams to more effectively manage projects and communicate clearly with clients.</p>\r\n                    <p class=\"text-center\">\r\n                        <a class=\"btn btn-default\" href=\"#\" role=\"button\">\r\n                            <span class=\"mega-octicon octicon-mirror\"></span>\r\n                        </a>\r\n                    </p>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                    <h2 class=\"home-head text-center\">We Invite You</h2>\r\n                    <p class=\"home-desc\">We hope you\'ll find it as useful as we do. When incorporated into a good workflow, these small pieces of automation have a large impact. The 8-10 hours per week we\'ve been saving frees team members to focus more on continually developing valuable software.</p>\r\n                    <p class=\"home-desc\">Help guide the product and get grandfathered in as we add more advanced features and expand our offering.</p>\r\n                    <p class=\"text-center\">\r\n                        <a class=\"btn btn-default\" href=\"#\" role=\"button\">\r\n                            <span class=\"mega-octicon octicon-mail-read\"></span>\r\n                        </a>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n            <br>\r\n            <br>\r\n            <div class=\"col-md-3\"></div>\r\n            <div class=\"col-md-6 text-center\">\r\n                <h4><a name=\"let-us-know-what-you-want\" href=\"#let-us-know-what-you-want\"></a>Let us know what you want.</h4>\r\n                <br>\r\n                <p>We\'d love your feedback and suggestions. Please <a href=\"https://github.com/spry-group/spryhub.io/issues/new\">open an issue</a> and let us know what you want.</p>\r\n            </div>\r\n            <div class=\"col-md-3\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ng/spryhub/learn.view/learn.html","<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-1 col-md-1 col-lg-3\"></div>\r\n            <div class=\"col-xs-12 col-sm-10 col-md-10 col-lg-6\">\r\n                <h2>Features and Benefits</h2>\r\n                    <p>&rarr;&nbsp;<span class=\"lg-beg-txt\">Project velocity</span> is the average points completed per sprint\r\n                    </p>\r\n                    <p>&rarr;&nbsp;<span class=\"lg-beg-txt\">Three sprint velocity</span> is the average velocity of the three most recent sprints\r\n                    </p>\r\n                    <p>&rarr;&nbsp;<span class=\"lg-beg-txt\">Remaining sprints</span> is a measured estimate based on the backlog\'s issue\'s point sum and three sprint velocity\r\n                    </p>\r\n                <h2>How it Works</h2>\r\n                <div class=\"col-lg-12 no-pad\">\r\n                    <span class=\"col-lg-12 no-pad\"><p>&rarr;&nbsp;SpryHub relies on the GitHub API to translate project (repo) metrics into a view designed for Agile developers.</p></span>\r\n                </div>\r\n                <br>\r\n                <div class=\"col-lg-12 no-pad\">\r\n                    <p>\r\n                        <span class=\"col-lg-8 col-xs-12 col-md-8 no-pad\">\r\n                            &rarr;&nbsp;Label terms - In order to provide these metrics, SpryHub depends our users to follow a specific way of assigning labels to GitHub issues. We provide custom labels which the user will assign to each issue. SpryHub then pulls in the label data and converts it into an Agile perspective.\r\n                        </span>\r\n                    </p>\r\n                    <br class=\"visible-lg\">\r\n                    <br class=\"visible-lg\">\r\n                    <br>\r\n                    <div class=\"col-xs-1 col-sm-1 col-lg-3\"></div>\r\n                    <div class=\"col-xs-10 col-md-4 col-lg-6 hidden-lg\">\r\n                        <ul class=\"in-block\">\r\n                            <li><span class=\"label points\">points/0</span>&nbsp;</li>\r\n                            <li><span class=\"label points\">points/0.5</span>&nbsp;</li>\r\n                            <li><span class=\"label points\">points/1</span>&nbsp;</li>\r\n                            <li><span class=\"label points\">points/3</span>&nbsp;</li>\r\n                            <li><span class=\"label points\">points/5</span>&nbsp;</li>\r\n                            <li><span class=\"label points\">points/8</span>&nbsp;</li>\r\n                            <li><span class=\"label points\">points/13</span>&nbsp;</li>\r\n                        </ul>\r\n                        <ul class=\"in-block\">    \r\n                            <li><span class=\"label priority\">priority/1</span>&nbsp;</li>\r\n                            <li><span class=\"label priority\">priority/2</span>&nbsp;</li>\r\n                            <li><span class=\"label priority\">priority/3</span>&nbsp;</li>\r\n                            <li><span class=\"label priority\">priority/4</span>&nbsp;</li>\r\n                            <li><span class=\"label priority\">priority/5</span>&nbsp;</li>\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"col-lg-12 hidden-xs hidden-sm hidden-md\">\r\n                        <span class=\"label points\">points/0</span>&nbsp;\r\n                        <span class=\"label points\">points/0.5</span>&nbsp;\r\n                        <span class=\"label points\">points/1</span>&nbsp;\r\n                        <span class=\"label points\">points/3</span>&nbsp;\r\n                        <span class=\"label points\">points/5</span>&nbsp;\r\n                        <span class=\"label points\">points/8</span>&nbsp;\r\n                        <span class=\"label points\">points/13</span>&nbsp;\r\n                        <span class=\"label priority\">priority/1</span>&nbsp;\r\n                        <span class=\"label priority\">priority/2</span>&nbsp;\r\n                        <span class=\"label priority\">priority/3</span>&nbsp;\r\n                        <span class=\"label priority\">priority/4</span>&nbsp;\r\n                        <span class=\"label priority\">priority/5</span>&nbsp;\r\n                    </div>\r\n                    <div class=\"col-xs-1 col-lg-3\"></div>\r\n                </div>                \r\n                <div class=\"col-xs-12 no-pad\">\r\n                    <br>\r\n                    <span class=\"col-lg-8 no-pad\">\r\n                        &rarr;&nbsp;Milestones - After labeling the issues of a specific project/repo, we then assign each issue to a specific milestone. SpryHub then recasts the milestone data as a sprint.\r\n                    </span>\r\n                </div>\r\n                <!-- <h3>SpryHub makes GitHub Agile</h3> commented out for aesthetic testing because there\'s no appended content -->\r\n            </div>\r\n        <div class=\"col-sm-1 col-md-1 col-lg-3\"></div>\r\n    </div>\r\n</div>");
$templateCache.put("ng/spryhub/project.view/project.html","\r\n<div class=\"container-fluid view-project\">\r\n    <ol class=\"breadcrumb\">\r\n        <li><a ui-sref=\"projects\">Projects</a></li>\r\n        <li><a ui-sref=\"project({owner: vm.owner, repo: vm.repo})\">{{vm.owner}}/{{vm.repo}}</a></li>\r\n    </ol>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-2\"></div>\r\n            <div class=\"col-xs-12 col-sm-3 col-md-2 col-lg-2\">\r\n                <div class=\"text-center kpi-value\" style=\"border-bottom: 2px solid grey; \"tooltip=\"Points closed per sprint\" tooltip-placement=\"top\" tooltip-popup-delay=\"750\">\r\n                    {{vm.project.velocity | number: 2 }}\r\n                </div>\r\n                <p class=\"text-center\">\r\n                    <span class=\"kpi-title\">Project<br>Velocity</span>\r\n                </p>\r\n            </div>\r\n            <div class=\"col-xs-12 col-sm-3 col-md-2 col-lg-2\">\r\n                <div class=\"text-center kpi-value\" style=\"border-bottom: 2px solid grey; \"tooltip=\"Three sprint moving average\" tooltip-placement=\"top\" tooltip-popup-delay=\"750\">\r\n                    {{ vm.project.velocity_3 | number: 2 }}\r\n                </div>\r\n                <p class=\"text-center\">\r\n                    <span class=\"kpi-title\">Three&nbsp;Sprint<br>Velocity</span>\r\n                </p>\r\n            </div>\r\n            <div class=\"col-xs-12 col-sm-3 col-md-2 col-lg-2\">\r\n                <div class=\"text-center kpi-value\" style=\"border-bottom: 2px solid grey; \"tooltip=\"Remaining points/3 sprint velocity\" tooltip-placement=\"top\" tooltip-popup-delay=\"750\">\r\n                    {{vm.project.sprints_remaining }}\r\n                </div>\r\n                <p class=\"text-center\">\r\n                    <span class=\"kpi-title\">Remaining<br>Sprints</span>\r\n                </p>\r\n            </div>\r\n            <div class=\"col-xs-12 col-sm-3 col-md-2 col-lg-2\">\r\n                <div class=\"text-center kpi-value\" style=\"border-bottom: 2px solid grey; \"tooltip=\"Likely accuracy of remaining sprints prediction\" tooltip-placement=\"top\" tooltip-popup-delay=\"750\">\r\n                    {{ vm.project.confidence | number: 2}}%\r\n                </div>\r\n                <div class=\"text-center\">\r\n                    <span class=\"kpi-title\">Confidence<br>Rating</span>\r\n                </div>\r\n            </div>\r\n        <div class=\"col-md-2\"></div>\r\n    </div>\r\n    <br>\r\n    <br>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 col-md-10 col-md-push-1\">\r\n            <table class=\"table table-responsive\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>Backlogs</th>\r\n                        <th class=\"text-center col-md-2\">Open<br>Issues</th>\r\n                        <th class=\"text-center col-md-2\">Open<br>Points</th>\r\n                        <th class=\"text-center col-md-2\">Issues<br>w/o Points</th>\r\n                        <th class=\"text-center col-md-2\">Issues<br>w/o Priority</th>\r\n                        <th class=\"text-center col-md-2\">Remaining<br>Sprints</th>\r\n                        <th class=\"text-center col-md-2\">Confidence</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr ng-repeat=\"backlog in vm.project.backlogs\">\r\n                        <td>{{backlog.title}}</td>\r\n                        <td class=\"text-center\">{{backlog.issues_open}}</td>\r\n                        <td class=\"text-center\">{{backlog.points_open}}</td>\r\n                        <td class=\"text-center\">{{backlog.issues_no_points}}</td>\r\n                        <td class=\"text-center\">{{backlog.issues_no_priority}}</td>\r\n                        <td class=\"text-center\">{{vm.Math.ceil(backlog.points_open / vm.project.velocity) }}</td>\r\n                        <td class=\"text-center\">{{ vm.Math.round((1 - (backlog.issues_no_points + backlog.issues_no_priority) / 2 / backlog.issues_open) * 100) | number: 0 }}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\" ng-show=\"vm.sprints_active.length > 0\">\r\n        <div class=\"col-md-10 col-md-push-1\">\r\n            <table class=\"table table-responsive\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"col-md-1\">Active<br/>Sprints</th>\r\n                        <th class=\"text-center col-md-1\">Closed<br>Points</th>\r\n                        <th class=\"text-center col-md-1\">Closed<br />Issues</th>\r\n                        <th class=\"text-center col-md-1\">Open<br />Points</th>\r\n                        <th class=\"text-center col-md-1\">Issues<br />w/o Points</th>\r\n                        <th class=\"text-center col-md-1\">Issues<br />w/o Priority</th>\r\n                        <th class=\"text-center col-md-2\">Start Date</th>\r\n                        <th class=\"text-center col-md-2\">End Date</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr ng-repeat=\"sprint in vm.sprints_active\">\r\n                        <td>\r\n                            <a ng-href=\"{{sprint.html_url}}\" target=\"_blank\">\r\n                                <span class=\"octicon octicon-mark-github\" tooltip=\"github\" tooltip-placement=\"left\"></span>\r\n                            </a>\r\n                            <a ng-href=\"{{sprint.html_url}}\" target=\"_blank\">\r\n                                {{sprint.shortTitle}}\r\n                            </a>\r\n                        </td>\r\n                        <td class=\"text-center col-md-1\">\r\n                            {{sprint.points_closed}}\r\n                        </td>\r\n                        <td class=\"text-center\">{{sprint.issues_closed}}</td>\r\n                        <td class=\"text-center\">{{sprint.points_open}}</td>\r\n                        <td class=\"text-center\">{{sprint.issues_no_points}}</td>\r\n                        <td class=\"text-center\">{{sprint.issues_no_priority}}</td>\r\n                        <td class=\"text-center\">{{sprint.startDate | date }}</td>\r\n                        <td class=\"text-center\">{{sprint.endDate | date }}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\" ng-show=\"vm.sprints_review.length > 0\">\r\n        <div class=\"col-md-10 col-md-push-1\">\r\n            <table class=\"table table-responsive\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"col-md-1\">Review<br/>Sprints</th>\r\n                        <th class=\"text-center col-md-1\">Closed<br>Points</th>\r\n                        <th class=\"text-center col-md-1\">Closed<br />Issues</th>\r\n                        <th class=\"text-center col-md-1\">Open<br />Points</th>\r\n                        <th class=\"text-center col-md-1\">Issues<br />w/o Points</th>\r\n                        <th class=\"text-center col-md-1\">Issues<br />w/o Priority</th>\r\n                        <th class=\"text-center col-md-2\">Start Date</th>\r\n                        <th class=\"text-center col-md-2\">End Date</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr ng-repeat=\"sprint in vm.sprints_review\">\r\n                        <td>\r\n                            <a ng-href=\"{{sprint.html_url}}\" target=\"_blank\">\r\n                                <span class=\"octicon octicon-mark-github\" tooltip=\"github\" tooltip-placement=\"left\"></span>\r\n                            </a>\r\n                            <a ng-href=\"{{sprint.html_url}}\" target=\"_blank\">\r\n                                {{sprint.shortTitle}}\r\n                            </a>\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            {{sprint.points_closed}}\r\n                        </td>\r\n                        <td class=\"text-center\">{{sprint.issues_closed}}</td>\r\n                        <td class=\"text-center\">{{sprint.points_open}}</td>\r\n                        <td class=\"text-center\">{{sprint.issues_no_points}}</td>\r\n                        <td class=\"text-center\">{{sprint.issues_no_priority}}</td>\r\n                        <td class=\"text-center\">{{sprint.startDate | date }}</td>\r\n                        <td class=\"text-center\">{{sprint.endDate | date }}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\" ng-show=\"vm.sprints_complete.length > 0\">\r\n        <div class=\"col-md-10 col-md-push-1\">\r\n            <table class=\"table table-responsive\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>Complete<br/>Sprints</th>\r\n                        <th class=\"text-center\">Velocity</th>\r\n                        <th class=\"text-center\">Change in<br />Velocity</th>\r\n                        <th class=\"text-center\">Closed<br />Issues</th>\r\n                        <th class=\"text-center\">Open<br />Points</th>\r\n                        <th class=\"text-center\">Issues<br />w/o Points</th>\r\n                        <th class=\"text-center\">Issues<br />w/o Priority</th>\r\n                        <th class=\"text-center\">Start Date</th>\r\n                        <th class=\"text-center\">End Date</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr ng-repeat=\"sprint in vm.sprints_complete\">\r\n                        <td>\r\n                            <a ng-href=\"{{sprint.html_url}}\" target=\"_blank\">\r\n                                <span class=\"octicon octicon-mark-github\" tooltip=\"github\" tooltip-placement=\"left\"></span>\r\n                            </a>\r\n                            <a ng-href=\"{{sprint.html_url}}\" target=\"_blank\">\r\n                                {{sprint.shortTitle}}\r\n                            </a>\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            {{sprint.points_closed}}\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            {{sprint.points_change}}\r\n                        </td>\r\n                        <td class=\"text-center\">{{sprint.issues_closed}}</td>\r\n                        <td class=\"text-center\">{{sprint.points_open}}</td>\r\n                        <td class=\"text-center\">{{sprint.issues_no_points}}</td>\r\n                        <td class=\"text-center\">{{sprint.issues_no_priority}}</td>\r\n                        <td class=\"text-center\">{{sprint.startDate | date }}</td>\r\n                        <td class=\"text-center\">{{sprint.endDate | date }}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ng/spryhub/projects.view/projects.html","<div class=\"container-fluid view-projects\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-push-1\">\r\n            <table class=\"table table-responsive col-xs-12\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>Project</th>\r\n                        <th>Velocity</th>\r\n                        <th>3 Sprint<br />Velocity</th>\r\n                        <th>Change in<br />Velocity</th>\r\n                        <th>Open<br />Issues</th>\r\n                        <th>Open<br />Points</th>\r\n                        <th>Issues<br />w/o Points</th>\r\n                        <th>Issues<br />w/o Priority</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr ng-repeat=\"repo in vm.userRepos | filter: { spryhub: true }\">\r\n                        <td>\r\n                            <a href=\"http://github.com/{{repo.full_name}}\" target=\"_blank\">\r\n                               <span class=\"octicon octicon-mark-github\"></span>\r\n                            </a>\r\n                            <a ui-sref=\"project({owner: repo.owner, repo: repo.name})\">{{repo.full_name}}</a>\r\n                        </td>\r\n                        <td>{{repo.velocity | number: 2}}</td>\r\n                        <td>{{repo.velocity_3 | number: 2}}</td>\r\n                        <td>{{repo.velocity_delta | number: 2}}</td>\r\n                        <td>{{repo.backlogs[0].issues_open}}</td>\r\n                        <td>{{repo.backlogs[0].points_open}}</td>\r\n                        <td>{{repo.backlogs[0].issues_no_points}}</td>\r\n                        <td>{{repo.backlogs[0].issues_no_priority}}</td>\r\n                        <td><button type=\"button\" class=\"btn btn-labels\" ng-click=\"vm.ensureLabels(repo)\">Add SpryHub Labels</button></td>\r\n                    </tr>\r\n                    <tr ng-repeat=\"repo in vm.orgRepos | filter: {spryhub: true } | orderBy: \'owner\'\">\r\n                        <td>\r\n                            <a href=\"http://github.com/{{repo.full_name}}\" target=\"_blank\">\r\n                                <span class=\"octicon octicon-mark-github\"></span>\r\n                            </a>\r\n                            <a ui-sref=\"project({owner: repo.owner, repo: repo.name})\">{{repo.full_name}}</a>\r\n                        </td>\r\n                        <td>{{repo.velocity | number: 2}}</td>\r\n                        <td>{{repo.velocity_3 | number: 2}}</td>\r\n                        <td>{{repo.velocity_delta | number: 2}}</td>\r\n                        <td>{{repo.backlogs[0].issues_open}}</td>\r\n                        <td>{{repo.backlogs[0].points_open}}</td>\r\n                        <td>{{repo.backlogs[0].issues_no_points}}</td>\r\n                        <td>{{repo.backlogs[0].issues_no_priority}}</td>\r\n                        <td><button type=\"button\" class=\"btn btn-labels\" ng-click=\"vm.ensureLabels(repo)\">Add SpryHub Labels</button></td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ng/spryhub/support.view/support.html","<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-1 col-md-2 col-lg-3\"></div>\r\n        <div style=\"border: 2px dashed #CCC; border-radius:5px;border-width:5px\" class=\"col-xs-12 col-sm-10 col-md-8 col-lg-6\">\r\n            <h2><em></em></h2>\r\n            <p>TKTK</p>\r\n            <h3><em>Dictionary</em></h3>\r\n            <p>TKTK</p>\r\n            <h3><em>SpryHub makes GitHub Agile</em></h3>\r\n        </div>\r\n        <div class=\"col-sm-1 col-md-2 col-lg-3\"></div>\r\n    </div>\r\n</div>");
$templateCache.put("ng/components/github/githubLoginButton.directive/github-login-button.html","<button type=\"submit\" class=\"btn btn-primary\" ng-if=\"!vm.user\" ng-click=\"vm.login()\">Authorize on GitHub</button>\r\n<div class=\"dropdown\" dropdown ng-if=\"vm.user\">\r\n    <a href class=\"dropdown-toggle\" dropdown-toggle aria-expanded=\"true\">\r\n        <img ng-attr-src=\"{{vm.user.avatar_url}}\" alt=\"user-image\" class=\"img-circle img-inline userpic-32\" width=\"32\">\r\n        <span>{{vm.user.login}}<i class=\"fa-angle-down\"></i></span>\r\n    </a>\r\n    <ul class=\"dropdown-menu\">\r\n        <li><a ng-click=\"vm.logout()\" href><i class=\"fa-lock\"></i>Logout</a></li>\r\n    </ul>\r\n</div>\r\n");}]); })();
(function() {
    angular.module('spryhub')
        .controller('spryhub.home', HomeController);

    HomeController.$inject = ['eventbus', '$state', 'authService'];

    function HomeController(eventbus, $state, authService) {
        var vm = this;
        vm.login = authService.login;
        vm.logout = authService.logout;
        vm.user = authService.getUser();

        eventbus.on('auth:login', onAuthLogin);
        eventbus.on('auth:logout', onAuthLogout);

        function onAuthLogout() {
            vm.user = authService.getUser();
        }

        function initialize() {
            vm.title = 'Home';
        }

        function onAuthLogin(event, token) {
            $state.go('projects');
        }

        initialize();
    }
    
})();

(function() {
    angular.module('spryhub')
        .controller('spryhub.learn', LearnController);

    LearnController.$inject = ['eventbus', '$state'];

    function LearnController(eventbus, $state) {
        var vm = this;

        eventbus.on('auth:login', onAuthLogin);

        function initialize() {
            vm.title = 'Learn More';
        }

        function onAuthLogin(event, token) {
            $state.go('projects');

        }


        initialize();
    }

})();

(function() {
  angular.module('spryhub')
    .controller('spryhub.project', ProjectController);

  ProjectController.$inject = ['eventbus', '$stateParams', 'sprint', 'repo', 'backlog'];

  function ProjectController(eventbus, $stateParams, sprintService, repoService, backlogService) {
    var vm = this;

    var defaults = {
      repo: '',
      owner: '',
      title: '',
      sprints: [],
      sprints_complete: [],
      sprints_review: [],
      sprints_active: [],
    };

    vm = angular.extend(vm, defaults);

    function initialize() {
      vm.repo = $stateParams.repo;
      vm.owner = $stateParams.owner;
      vm.title = vm.repo.name;
      vm.Math = window.Math;

      repoService.getRepo(vm.owner, vm.repo).then(function(repo) {
        vm.project = repo;
        vm.project.ctorPromise.then(function() {
          var orderedSprints = vm.project.sprints.sort(function(a, b) {
            return b.startDate - a.startDate;
          });

          for (var i = 0; i < orderedSprints.length; i++) {
            var _currentSprint = orderedSprints[i];
            var _previousSprint = orderedSprints[i + 1];

            if (_currentSprint.status === 'complete') {
              vm.sprints_complete.push(_currentSprint);
            }
            else if (_currentSprint.status === 'in review') {
              vm.sprints_review.push(_currentSprint);
              continue;
            }
            else if (_currentSprint.status === 'active') {
              vm.sprints_active.push(_currentSprint);
              continue;
            }
            if (_previousSprint) {
              _currentSprint.points_change =  _currentSprint.points_closed - _previousSprint.points_closed;
            }
            else {
              _currentSprint.points_change = _currentSprint.points_closed;
            }
          }
        });
      });
    }

    initialize();
  }
})();

(function() {
    angular.module('spryhub')
        .controller('spryhub.projects', ProjectsController);

    ProjectsController.$inject = ['eventbus', 'authService', 'repo', '$state', '$stateParams', 'github', 'labels'];

    function ProjectsController(eventbus, authService, repoService, $state,
     $stateParams, githubService, labelsService) {
        var vm = this;

        eventbus.on('auth:login', onAuthLogin);
        eventbus.on('auth:logout', onAuthLogout);

        function initialize() {
            vm.title = 'Projects';
            vm.user = authService.getUser();
            vm.orgRepos = [];
            vm.userRepos = [];
            vm.orgs = [];
            vm.ensureLabels = ensureLabels;

            if (!vm.user) {
                return;
            }

            getOrgRepos();
            getUserRepos();
        }

        initialize();

        function onAuthLogin(event, token) {
            vm.user = authService.getUser();
            initialize();
        }

        function onAuthLogout(event, token) {
            $state.go('home');
        }

        /**
         */
        function getOrgRepos() {
            repoService
                .getOrgRepos(vm.user.login)
                .then(function _persistOrgRepos(repos) {
                    vm.orgRepos = vm.orgRepos.concat(repos);
                });
        }

        /**
         */
        function getUserRepos() {
            repoService
                .getUserRepos(vm.user.login)
                .then(function _persistUserRepos(repos) {
                    vm.userRepos = vm.userRepos.concat(repos);
                });
        }

        function ensureLabels(repo) {
          labelsService.ensureLabels(repo.owner, repo.name);
        }
    }

})();

(function() {
    angular.module('spryhub')
        .controller('spryhub.support', SupportController);

    SupportController.$inject = ['eventbus', '$state'];

    function SupportController(eventbus, $state) {
        var vm = this;

        eventbus.on('auth:login', onAuthLogin);

        function initialize() {
            vm.title = 'Support';
        }

        function onAuthLogin(event, token) {
            $state.go('projects');

        }


        initialize();
    }

})();
(function() {
  'use strict';
  angular.module('eventbus')
    .service('eventbus', EventBus);

  // EventBus provides an event registry that can be used by both
  // services which have no scope and controllers which do have
  // scope.
  //
  // $rootScope.emit is used as the mechanism so events emitted
  // through the event bus do not propogate through the scope tree.

  EventBus.$inject = ['$rootScope'];

  function EventBus($rootScope) {
    var service = this;

    return {
      emit: emit,
      on: on,
    };

    function emit(name, args) {
      return $rootScope.$emit(name, args);
    }

    function on(name, listener) {
      return $rootScope.$on(name, listener);
    }
  }
})();

(function() {
    'use strict';
    angular.module('auth')
        .provider('authService', AuthServiceProvider);

    function AuthServiceProvider() {
        var config = null;
        var provider = this;
        this.configure = function configure(authConfig) {
            provider.config = authConfig;
        };

        this.$get = AuthServiceFactory;

        AuthServiceFactory.$inject = ['eventbus', '$http', 'github',
            '$localStorage'
        ];

        function AuthServiceFactory(eventbus, $http, github, $localStorage) {
            return new AuthService(eventbus, $http, github, $localStorage,
                provider.config);
        }
    }

    function AuthService(eventbus, $http, github, $localStorage, config) {
        var service = this;
        service.storage = $localStorage.$default({
            token: null,
            user: null
        });

        github.setToken(service.storage.token);

        return {
            login: login,
            logout: logout,
            complete: complete,
            getToken: getToken,
            getUser: getUser
        };

        function login() {
            // redirect user to github login, if they're not logged in.
            if (service.storage.token) {
                return;
            }
            var authUrl = 'https://github.com/login/oauth/authorize?';
            var authClientId = 'client_id=' + config.github.clientId;
            var authScope = '&scope=repo,user:email';
            window.location.replace(authUrl + authClientId + authScope);
        }

        function complete(code) {
            return $http.get(config.github.gatekeeperUrl + code)
                .success(success)
                .error(error);

            function success(data, status, headers, config) {
                service.storage.token = data.token;
                github.setToken(service.storage.token);
                github.getUser().then(function(user) {
                    service.storage.user = user;
                    eventbus.emit('auth:login', service.user);
                });
                return service.storage.token;
            }

            function error(data, status, headers, config) {
                eventbus.emit('auth:logout');
                eventbus.emit('auth:fail', data);
            }
        }

        function logout() {
            service.storage.token = null;
            service.storage.user = null;
            eventbus.emit('auth:logout');
        }

        function getToken() {
            return service.storage.token;
        }

        function getUser() {
            return service.storage.user;
        }
    }
})();

(function() {
    'use strict';

    angular.module('github')
    .service('github', GithubService);

    GithubService.$inject = ['eventbus', '$http', '$q'];

    var endpoint = 'https://api.github.com';

    function GithubService(eventbus, $http, $q) {
        var service = this;

        return {
            setToken: setToken,
            getRepo: getRepo,
            getOrgRepos: getOrgRepos,
            getUserRepos: getUserRepos,
            getUserOrgs: getUserOrgs,
            getUser: getUser,
            getRepoIssues: getRepoIssues,
            getRepoContent: getRepoContent,
            getRepoMilestones: getRepoMilestones,
            getMilestoneIssues: getMilestoneIssues,
            getLabels: getLabels,
            createLabel: createLabel
        };

        /**
         * Wrap basic mechanics of handling github requests.
         * The API endpoint will be pre-pended to and URI's you
         * pass into it.
         *
         * @param options
         *
         *    page: '*' - return all data for all pages.
         *
         * @returns
         *    {
         *      links:
         *      page:
         *      pages:
         *      data:
         *    }
         */
         function _gitRequest(options) {
            var defaults = {
                method: 'GET',
                params: {
                    'per_page': 100,
                },
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            };

            if (service.token) {
                defaults.headers.Authorization = 'token ' + service.token;
            }

            var config = angular.extend({}, defaults, options);

            if ('url' in config) {
                if (config.url.indexOf('http') !== 0) {
                    if (config.url.indexOf('/') !== 0) {
                        config.url = '/' + config.url;
                    }
                    config.url = endpoint + config.url;
                }
            }

            if (config.params.page === '*') {
                return $http(config).then(_returnAggregatePageData);
            }

            return $http(config).then(_returnData);
        }

        function _getPage(response) {
            if (response.config.params.page === '*') {
                return 1;
            }
            return response.config.params.page;
        }

        function _getPages(response) {
            var links = _getLinks(response);
            if (links.length === 0) {
                return 1;
            }
            if ('last' in links) {
                // parse out the page number
                return 1;
            }
            // assume the current page is the last
            // if there is no last link.
            return _getPage(response);

        }

        function _getLinks(response) {
            var headers = response.headers();
            var links = {};
            if ('link' in headers) {
                // link format:
                // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next",
                //  <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
                headers.link.replace(/<([^>]*)>;\s*rel="([\w]*)\"/g, function(m, uri, type) {
                    links[type] = uri;
                });
            }
            return links;
        }

        function _returnData(response) {
            return response.data;
        }

        function _returnAggregatePageData(response) {
            var data = [];
            return _getNextPage(response);

            function _getNextPage(response) {
                data = data.concat(response.data);
                var page = _getPage(response);
                var links = _getLinks(response);
                if (links.next) {
                    var config = response.config;
                    config.params.page = parseInt(page) + 1;
                    return $http(config).then(_getNextPage);
                }
                return data;
            }
        }

        function setToken(token) {
            service.token = token;
        }

        function getRepo(owner, repo) {
            var config = {
                url: 'repos/' + owner + '/' + repo
            };
            return _gitRequest(config);
        }

        function getRepoIssues(owner, repo, params) {
            var _issues = [];
            var defaults = {
                page: '*'
            };

            var _params = angular.extend({}, defaults, params);

            var config = {
                url: 'repos/' + owner + '/' + repo + '/issues',
                params: _params
            };

            return _gitRequest(config);
        }

        function getRepoContent(owner, repo, path) {
            var config = {
                'url':  'repos/' + owner + '/' + repo + '/contents/' + path
            };
            return _gitRequest(config);
        }

        function getRepoMilestones(owner, repo, state) {
            var config = {
                'url':  'repos/' + owner + '/' + repo + '/milestones',
                'params': {
                    'state': 'all'
                }
            };

            if (state) {
                config.params.state = state;
            }

            return _gitRequest(config);
        }

        /**
         * Milestone - integer or string
         * If an integer is passed, it should refer to a milestone number.
         *
         * If the string * is passed, issues with any milestone
         * are accepted. If the string none is passed, issues without milestones are
         * returned.
         */
         function getMilestoneIssues(owner, repo, milestone) {
            var config = {
                'url':  'repos/' + owner + '/' + repo + '/issues',
                'params': {
                    'milestone': milestone,
                    'state': 'all'
                }
            };

            if (milestone) {
                config.params.milestone = milestone;
            }

            return _gitRequest(config);
        }

        function getUserRepos(user, filter) {
            var config = {
                'url':  'users/' + user + '/repos'
            };
            return _gitRequest(config)
            .then(function(data) {
                return data.filter(_filterRepoHasIssues);
            });
        }

        function _filterRepoHasIssues(repo, idx, repos) {
            return repo['has_issues'];
        }

        function getUserOrgs(user) {
            var config = {
                'url': 'users/' + user + '/orgs'
            };
            return _gitRequest(config);
        }

        function getOrgRepos(org) {
            var config = {
                'url': 'orgs/' + org + '/repos'
            };
            return _gitRequest(config)
            .then(function(data) {
                return data.filter(_filterRepoHasIssues);
            });
        }

        function getUser() {
            var config = {
                'url':  'user'
            };
            return _gitRequest(config);
        }

        function getLabels(owner, repo) {
            var options = {
              'url': '/repos/' + owner + '/' + repo + '/labels'
            };
          return _gitRequest(options);
        }

        function createLabel(owner, repo, name, color) {
            var options = {
                method: 'POST',
                'url':  '/repos/' + owner + '/' + repo + '/labels',
                'data': { name: name, color: color }
            };
            return _gitRequest(options);
        }
}
})();

(function() {
    'use strict';
    angular.module('github')
        .directive('githubLoginButton', GithubLoginButton);

    GithubLoginButton.$inject = ['authService', 'eventbus'];

    function GithubLoginButton(authService, eventbus) {
        var directive = {
            restrict: 'E',
            templateUrl: 'ng/components/github/githubLoginButton.directive/github-login-button.html',
            link: link,
            controller: GithubLoginButtonController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element) {}
    }

    GithubLoginButtonController.$inject = ['authService', 'eventbus'];

    function GithubLoginButtonController(authService, eventbus) {
        var vm = this;
        vm.login = authService.login;
        vm.logout = authService.logout;

        vm.user = authService.getUser();

        eventbus.on('auth:login', onAuthLogin);
        eventbus.on('auth:logout', onAuthLogout);

        function onAuthLogin(event, token) {
            vm.user = authService.getUser();
        }

        function onAuthLogout() {
            vm.user = authService.getUser();
        }

    }

})();

(function() {
  'use strict';

  angular.module('spryhub.domain')
    .service('backlog', BacklogService);

  BacklogService.$inject = ['$q', 'github', 'issue'];

  function BacklogService($q, githubService, issueService) {

    return {
      getBacklogs: getBacklogs
    };


    function getBacklogs(owner, repo) {
      var promise = $q(function(resolve, reject) {
        var backlogs = [];
        var backlog = new Backlog(owner, repo);
        backlogs.push(backlog);
        resolve(backlogs);
      });
      return promise;
    }

    /**
     * constructor for Backlog
     */
    function Backlog(owner, repo) {
      var _backlog = this;
      _backlog.issuePromise = null;

      function initialize() {
        _backlog.owner = owner;
        _backlog.repo = repo;
        _backlog.title = 'All';

        _backlog.ctorPromise = getIssues()
        .then(function(issues) {
          _backlog.points_open = 0;
          _backlog.points_closed = 0;
          _backlog.issues_total = issues.length;
          _backlog.issues_open = 0;
          _backlog.issues_closed = 0;
          _backlog.issues_no_points = 0;
          _backlog.issues_no_priority = 0;

          issues.forEach(function(issue) {
            if (issue.state === 'open') {
              _backlog.issues_open++;
              if (!issue.priority) {
                _backlog.issues_no_priority++;
              }
              if (issue.points) {
                _backlog.points_open += issue.points;
              }
              else {
                _backlog.issues_no_points++;
              }
            }
          });
        });
      }

      /**
       * Get issues for a specific backlog.
       *
       * @param refresh bool if true client will fetch data from github again.
       *                     otherwise cached data will be used if available.
       *                     default: false
       */
      function getIssues(refresh) {
        if (refresh || !_backlog.issuePromise) {
          _backlog.issuePromise = issueService.getIssues(_backlog.owner, _backlog.repo, 'none', 'open');
        }
        return _backlog.issuePromise;
      }

      initialize();
    }
  }
})();

(function() {
  'use strict';
  angular.module('spryhub.domain')
    .service('issue', IssueService);

  IssueService.$inject = ['github'];

  function IssueService(githubService) {

    var service = this;

    return {
      getRepoIssues: getRepoIssues,
      getSprintIssues: getSprintIssues,
      getIssues: getIssues
    };

    function getRepoIssues(owner, repo) {
      return githubService
        .getRepoIssues(owner, repo)
        .then(_instantiateIssues);
    }

    function _instantiateIssues(issues) {
      var _issues = [];
      issues.forEach(function(issue, idx, arr) {
        var _issue = new Issue(issue);
        _issues.push(issue);
      });
      return _issues;
    }

    function getSprintIssues(owner, repo, milestone) {
      return githubService
        .getMilestoneIssues(owner, repo, milestone)
        .then(_instantiateIssues);
    }

    function getIssues(owner, repo, milestone, state) {
      var params = {};
      // convert function params to params object for
      // gitHubService.
      if (milestone) {
        params.milestone = milestone;
      }
      if (state) {
        params.state = state;
      }
      return githubService.getRepoIssues(owner, repo, params)
        .then(_instantiateIssues);
    }

    /**
     * constructor for Issue entity
     */
    function Issue(issue) {
      var _issue = this;

      function initialize() {
        _issue = issue;
        parseLabels();
      }

      function parseLabels() {
        _issue.points = null;
        _issue.priority = null;
        _issue.labels.forEach(function(label) {
          var parts = label.name.split('/');
          var type = parts[0];
          var value = parts[1];
          if (type === 'points') {
            _issue.points = parseFloat(value);
          }
          if (type === 'priority') {
            _issue.priority = parseInt(value);
          }
        });
      }

      initialize();
    }

  }
})();

(function() {
  'use strict';

  angular.module('spryhub.domain')
    .service('labels', LabelsService);

  LabelsService.$inject = ['github'];

  function LabelsService(githubService) {
    var svc = this;

    var defaultLabels = [
      {
          'name': 'points/0',
          'color': '0052cc'
      },
      {
          'name': 'points/0.5',
          'color': '0052cc'
      },
      {
          'name': 'points/1',
          'color': '0052cc'
      },
      {
          'name': 'points/3',
          'color': '0052cc'
      },
      {
          'name': 'points/5',
          'color': '0052cc'
      },
      {
          'name': 'points/8',
          'color': '0052cc'
      },
      {
          'name': 'points/13',
          'color': '0052cc'
      },
      {
          'name': 'priority/1',
          'color': '009800'
      },
      {
          'name': 'priority/2',
          'color': '009800'
      },
      {
          'name': 'priority/3',
          'color': '009800'
      },
      {
          'name': 'priority/4',
          'color': '009800'
      },
      {
          'name': 'priority/5',
          'color': '009800'
      }

    ];

    return {
      ensureLabels: ensureLabels,
    };

    function get(owner, repo) {
      return githubService.getLabels(owner, repo);
    }

    function create(owner, repo, name, color) {
      return githubService.createLabel(owner, repo, name, color);
    }

    function ensureLabels(owner, repo) {
      get(owner,repo).then(function(existingLabels) {
          for (var i = 0; i < defaultLabels.length; i++) {
            var label = defaultLabels[i];
            ensureLabel(owner, repo, label, existingLabels);
          }
      });
    }

    function ensureLabel(owner, repo, label, existingLabels) {
      if (!labelExists(label, existingLabels)) {
        create(owner, repo, label.name, label.color);
      }
    }

    function labelExists(label, existingLabels) {
      for (var i = 0; i < existingLabels.length; i++) {
        var existingLabel = existingLabels[i];
        if (label.name === existingLabel.name) {
          return true;
        }
      }
      return false;
    }
  }

})();

(function() {
  'use strict';

  angular.module('spryhub.domain')
    .service('repo', RepoService);

  RepoService.$inject = ['github', '$q', 'issue', 'sprint', 'backlog'];

  function RepoService(github, $q, issueService, sprintService, backlogService) {
    var service = this;

    return {
      getOrgRepos: getOrgRepos,
      getUserRepos: getUserRepos,
      getRepo: getRepo
    };

    /**
     * @param {object} org - github org object with login property as returned by github.getUserOrgs
     */
    function getOrgRepos(userLogin) {
      return github.getUserOrgs(userLogin)
        .then(_aggregateOrgRepos);

      function _aggregateOrgRepos(orgs) {
        var _repos = [];
        var _promises = [];

        orgs.forEach(function(org, idx, arr) {
          var promise = github.getOrgRepos(org.login)
            .then(_instantiateRepositories)
            .then(function(repos) {
              _repos = _repos.concat(repos);
            });
          _promises.push(promise);
        });

        var promise = $q.all(_promises).then(function() {
          return _repos;
        });
        return promise;
      }
    }

    function getUserRepos(userLogin) {
      return github
        .getUserRepos(userLogin)
        .then(_instantiateRepositories);
    }

    function getRepo(owner, repo) {
      return github
        .getRepo(owner, repo)
        .then(function(repo) {
          var project = new Repository(repo);
          return project;
        });
    }

    function _instantiateRepositories(repos) {
      var _repos = [];
      repos.forEach(function(repo, idx, arr) {
        var _repo = new Repository(repo);
        _repos.push(_repo);
      });
      return _repos;
    }

    /**
     * constructor for Repository entity
     */
    function Repository(repo) {
      var _repo = this;

      function initialize() {
        _repo.owner = repo.owner.login;
        _repo.name = repo.name;
        _repo.has_issues = repo.has_issues;
        _repo.full_name = repo.full_name;
        _repo.spryhub = false;

        _repo.ctorPromise = getConfig().then(function() {
          if (_repo.spryhub === true) {
            return $q.all([getSprints(), getBacklogs()])
              .then(_waitForConstruction)
              .then(_calculateMetrics);
          }
        });
      }

      function _waitForConstruction() {
         var promises = [];

          _repo.sprints.forEach(function(sprint) {
            promises.push(sprint.ctorPromise);
          });

          _repo.backlogs.forEach(function(backlog) {
            promises.push(backlog.ctorPromise);
          });

          return $q.all(promises);
      }

      function _calculateMetrics() {
        _repo.sprints = _repo.sprints.sort(function(a,b) { return b.startDate - a.startDate; });
        _repo.velocity_3_sum = 0;
        _repo.velocity_current = 0;
        _repo.velocity_previous = 0;
        var hits = 0;
        for (var idx = 0; hits < 3 && idx < _repo.sprints.length ; idx++) {
          if (_repo.sprints[idx].state === 'closed') {
            _repo.velocity_3_sum += _repo.sprints[idx].points_closed;
            if (hits === 0) {
              _repo.velocity_current = _repo.sprints[idx].points_closed;
            }
            if (hits === 1) {
              _repo.velocity_previous = _repo.sprints[idx].points_closed;
            }
            hits++;
          }
        }
        _repo.velocity_3 = _repo.velocity_3_sum / 3;
        _repo.velocity_delta = _repo.velocity_current - _repo.velocity_previous;

        _repo.points_closed = 0;
        _repo.sprints_closed = 0;
        _repo.sprints.forEach(function(sprint) {
          if (sprint.state === 'closed') {
            _repo.sprints_closed++;
            _repo.points_closed += sprint.points_closed;
          }
        });

        _repo.velocity = _repo.points_closed / _repo.sprints_closed;
        var backlog = _repo.backlogs[0];
        _repo.sprints_remaining = Math.ceil(backlog.points_open / _repo.velocity_3);

        _repo.confidence = Math.round((1 -
          (backlog.issues_no_points + backlog.issues_no_priority) / 2 / backlog.issues_open) *
          100);
      }

      function getSprints() {
        if (!_repo.sprintsPromise) {
          _repo.sprintsPromise = sprintService.getSprints(_repo.owner, _repo.name)
            .then(function(sprints) {
               _repo.sprints = sprints;
               return _repo.sprints;
            });
        }
        return _repo.sprintsPromise;
      }

      function getBacklogs() {
        if (!_repo.backlogsPromise) {
          _repo.backlogsPromise = backlogService.getBacklogs(_repo.owner, _repo.name)
            .then(function(backlogs) {
              _repo.backlogs = backlogs;
              return _repo.backlogs;
            });
        }
        return _repo.backlogsPromise;
      }

      function getContent(path) {
        return github.getRepoContent(_repo.owner, _repo.name, path);
      }

      function getConfig() {
        return getContent('')
          .then(function(files) {
            files.forEach(function(file) {
              if (file.name === 'spryhub.json') {
                 _repo.spryhub = true;
              }
            });
          });
      }

      initialize();
    }
  }


})();

(function() {
  'use strict';

  angular.module('spryhub.domain')
    .service('sprint', SprintService);

  SprintService.$inject = ['github', 'issue'];

  function SprintService(githubService, issueService) {

    return {
      getSprints: getSprints
    };


    function getSprints(owner, repo) {
      return githubService.getRepoMilestones(owner, repo)
        .then(function(sprints) {
          return _instantiateSprints(sprints, owner, repo);
        });
    }

    function _instantiateSprints(sprints, owner, repo) {
      var _sprints = [];
      sprints.forEach(function(sprint, idx, arr) {
        var _sprint = new Sprint(sprint, owner, repo);
        if (isNaN(_sprint.startDate) || isNaN(_sprint.endDate)) {
          console.log('Milestone Title is not formatted as a SpryHub Sprint :: ', _sprint.title, _sprint.html_url);
          return;
        }
        _sprints.push(_sprint);
      });
      return _sprints;
    }

    /**
     * constructor for Sprint
     */
    function Sprint(sprint, owner, repo) {
      angular.extend(this, sprint);
      var _sprint = this;


      function initialize() {
        _sprint.ctorPromise = null;
        _sprint.owner = owner;
        _sprint.repo = repo;
        var _parts = sprint.title.trim().split(' ');
        var _date = _parts.shift();
        var dates = _date.split('-');
        _sprint.startDate = Date.parse(dates[0]);
        _sprint.endDate = Date.parse(dates[1]);
        _sprint.shortTitle = _parts.join(' ');
        _sprint.state = sprint.state;
        _sprint.due_on = Date.parse(sprint.due_on);

        _sprint.ctorPromise = getIssues()
          .then(_calculateMetrics);

        if (_sprint.state === 'closed') {
          _sprint.status = 'complete';
        }
        else if (Date.now() > _sprint.due_on) {
          _sprint.status = 'in review';
        }
        else if (Date.now() < _sprint.due_on) {
          _sprint.status = 'active';
        }
      }

      function getIssues() {
        if (!_sprint.issuePromise) {
          _sprint.issuePromise = issueService
            .getSprintIssues(_sprint.owner, _sprint.repo, _sprint.number);
        }
        return _sprint.issuePromise;
      }

      function _calculateMetrics(issues) {
        _sprint.points_open = 0;
        _sprint.points_closed = 0;
        _sprint.issues_total = issues.length;
        _sprint.issues_open = 0;
        _sprint.issues_closed = 0;
        _sprint.issues_no_points = 0;
        _sprint.issues_no_priority = 0;

        issues.forEach(function(issue) {
          if (issue.state === 'open') {
            _sprint.issues_open++;
            if (!issue.priority) {
              _sprint.issues_no_priority++;
            }
            if (issue.points) {
              _sprint.points_open += issue.points;
            }
            else {
              _sprint.issues_no_points++;
            }
          }

          if (issue.state === 'closed') {
            _sprint.issues_closed++;
            if (issue.points) {
              _sprint.points_closed += issue.points;
            }
          }
        });
      }

      initialize();
    }
  }
})();
